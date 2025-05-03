const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ProductService = {
  getAll: async ({ page = 1, limit = 10, category } = {}) => {
    const skip = (page - 1) * limit;
    const filter = category ? { category } : {};

    return prisma.product.findMany({
      where: filter,
      skip,
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
    return prisma.product.create({ data });
  },

  getById: async (id) => {
    return prisma.product.findUnique({ where: { id } });
  },

  update: async (id, data) => {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    return prisma.product.delete({ where: { id } });
  },
};

module.exports = ProductService;
