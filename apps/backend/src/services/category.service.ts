import { CategoryCreatePayload } from '../types/category.types';
import prisma from '../utils/prisma';

export class CategoryService {
  static async createCategory(data: CategoryCreatePayload) {
    const existingCategory = await prisma.category.findUnique({
      where: { name: data.name },
    });

    if (existingCategory) {
      throw new Error('Category already existed.');
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return category;
  }

  static async getAllCategories() {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  static async getCategoryById(id: string) {
    return await prisma.category.findUnique({
      where: { id },
    });
  }
}
