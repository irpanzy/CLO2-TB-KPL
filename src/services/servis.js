// getAll: async ({ page = 1, limit = 8, category } = {}) => {
//     const skip = (page - 1) * limit;
//     const filter = category ? { category } : {};

//     const [products, totalItems] = await Promise.all([
//       prisma.product.findMany({
//         where: filter,
//         skip,
//         take: limit,
//         select: {
//           id: true,
//           name: true,
//           price: true,
//           category: true,
//           image: true,
//           createdAt: true,
//           updatedAt: true,
//         },
//       }),
//       prisma.product.count({
//         where: filter,
//       }),
//     ]);

//     return {
//       products,
//       totalItems,
//       totalPages: Math.ceil(totalItems / limit),
//     };
//   },