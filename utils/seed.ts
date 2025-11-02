import { connectDB } from "./mongodb";
import { User, Role } from "@/models";
import { hashPassword } from "./password";

const seed = async () => {
  try {
    console.log("🌱 Starting database seeding...");
    
    await connectDB();
    await User.deleteMany({});
    console.log("🗑️  Cleared existing users");
    
    const hashedPassword = hashPassword("admin123");
    await User.create({
      email: "admin@example.com",
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
    });
    
    console.log("✅ Created superAdmin user");
    
    const users = await User.find({}).select("-password");
    console.log(`\n📊 Total Users: ${users.length}`);
    users.forEach((user) => {
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

