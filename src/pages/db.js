import PrismaClient from "@prisma/client";

export const prisma = global.prisma || new PrismaClient.PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
