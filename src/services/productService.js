const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ProductService = {
  getAll: async ({ page = 1, limit = 10, category }) => {
    const skip = (page - 1) * limit;

    const where = category ? { category: category } : {};

    return await prisma.product.findMany({
      where: where,
      skip: skip,
      take: limit,
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  create: async (data) => {
    return await prisma.product.create({
      data,
    });
  },

  getById: async (id) => {
    return await prisma.product.findUnique({
      where: { id },
    });
  },

  update: async (id, data) => {
    return await prisma.product.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    return await prisma.product.delete({
      where: { id },
    });
  },
};

module.exports = ProductService;
