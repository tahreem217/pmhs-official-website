import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Creating Admin user...")

  const newAdmin = await prisma.admin.create({
    data: {
      username: "admin_main", // You can change this to whatever username you prefer
      
      // IMPORTANT: Replace this string with your actual Clerk User ID
      // You can find this in your Clerk Dashboard under "Users"
      clerkId: "user_3DtBqKSq7YSnXOs7mbTzBBxafLp", 
    },
  })
  
  console.log("✅ Admin created successfully:", newAdmin)
}

main()
  .catch((e) => {
    // If the username or clerkId already exists, Prisma will throw an error here
    console.error("❌ Error creating adnpx tsx seed-admin.tsmin:", e.message)

    
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })