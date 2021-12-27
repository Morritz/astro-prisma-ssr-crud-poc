const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient.PrismaClient();

async function main() {
  // We create a new user
  const firstBook = await prisma.book.create({
    data: {
      name: "TEST",
      author: "TEST",
    },
  });
  console.log(firstBook);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
