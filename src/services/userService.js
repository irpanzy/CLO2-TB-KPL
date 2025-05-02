const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const saltRounds = 10;

const UserService = {
  getAll: async () => {
    return await prisma.user.findMany();
  },

  create: async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  },

  getById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  getByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  update: async (id, { name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  },

  delete: async (id) => {
    return await prisma.user.delete({
      where: { id },
    });
  },
};

module.exports = UserService;
