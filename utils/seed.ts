import { prisma } from "./prisma";
import { Role } from "@prisma/client";
import { hashPassword } from "./password";

const seed = async () => {
  try {
    console.log("🌱 Starting database seeding...");
    
    await prisma.user.deleteMany({});
    console.log("🗑️  Cleared existing users");
    
    const hashedPassword = hashPassword("admin123");
    await prisma.user.create({
      data: {
        email: "admin@example.com",
        password: hashedPassword,
        role: Role.superAdmin,
      },
    });
    
    console.log("✅ Created superAdmin user");
    
    const users = await prisma.user.findMany({
      select: { email: true, role: true },
    });
    console.log(`\n📊 Total Users: ${users.length}`);
    users.forEach((user: { email: string; role: string }) => {
      console.log(`  - ${user.email} - ${user.role}`);
    });

    console.log("\n✨ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seed();

