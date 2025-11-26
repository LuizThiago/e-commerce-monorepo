import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  const data: Prisma.CategoryCreateInput = req.body;

  const category = await prisma.category.create({ data });
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.CategoryUpdateInput = req.body;

  const category = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });
  res.status(200).json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const categoryToDelete = await prisma.category.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(categoryToDelete);
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
};
