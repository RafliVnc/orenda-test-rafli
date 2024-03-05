import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const { name, phone, email, address } = req.body;
      const result = await prisma.customer.create({
        data: { name, phone, email, address },
      });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await prisma.customer.findMany();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await prisma.customer.findUnique({
        where: { custId: Number(id) || undefined },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, phone, email, address } = req.body;
      const updatedCustomer = await prisma.customer.update({
        where: { custId: Number(id) || undefined },
        data: { name, phone, email, address },
      });
      res.status(200).json(updatedCustomer);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedCustomer = await prisma.customer.delete({
        where: { custId: Number(id) || undefined },
      });
      res.status(200).json(deletedCustomer);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
}
