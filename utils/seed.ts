// Load environment variables first (will be loaded when mongodb imports it)
import { connectDB } from "./mongodb";
import User from "@/types/User";

const dummyUsers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 28,
    role: "user",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 32,
    role: "admin",
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    age: 45,
    role: "user",
  },
  {
    name: "Alice Williams",
    email: "alice.williams@example.com",
    age: 29,
    role: "user",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    age: 35,
    role: "admin",
  },
];

async function seed() {
  try {
    console.log("🌱 Starting database seeding...");
    
    // Connect to database
    await connectDB();
    
    // Clear existing users
    await User.deleteMany({});
    console.log("🗑️  Cleared existing users");
    
    // Insert dummy data
    const insertedUsers = await User.insertMany(dummyUsers);
    console.log(`✅ Inserted ${insertedUsers.length} users into database`);
    
    // Fetch and display inserted users
    const users = await User.find({});
    console.log("\n📊 Inserted Users:");
    users.forEach((user) => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
    });
    
    console.log("\n✨ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();

