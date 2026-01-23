const { PrismaClient } = require("../generated/prisma");

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

module.exports = prisma;