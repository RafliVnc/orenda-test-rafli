import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ProductController {
  async create(req: Request, res: Response) {
    try {
      const { name, unit, price } = req.body;
      const result = await prisma.product.create({
        data: { name, unit, price },
      });
      res.status(201).json({
        message: "create OK",
        result
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await prisma.product.findMany();
      res.status(200).json({
        message: "findAll OK",
        result
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await prisma.product.findUnique({
        where: { productId: Number(id) || undefined }
      });
      res.status(200).json({
        message: "findOne OK",
        result
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, unit, price } = req.body;
      const updatedPost = await prisma.product.update({
        where: { productId: Number(id) || undefined },
        data: { name, unit, price },
      });
      res.status(200).json({
        message: "update OK",
        updatedPost
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedCustomer = await prisma.product.delete({
        where: { productId: Number(id) || undefined },
      });
      res.status(200).json({
        message: "delete OK",
        deletedCustomer,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
}