import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class orderController {
  async create(req: Request, res: Response) {
    try {
      const { CustId, total_order, discount } = req.body;
      const result = await prisma.order.create({
        data: {
          totalOrder: total_order,
          discount: discount,
          customer: {
            connect: {
              custId: CustId
            }
          }
        }
      });

      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
  async getDetailOrder(req: Request, res: Response) {
    try {
      const orderId = parseInt(req.params.id); 
      const detailOrder = await prisma.detailOrder.findMany({
        where: {
          OrderId: orderId,
        },
        include: {
          order: true, 
          product: true 
        },
      });

      if (detailOrder) {
        res.status(200).json(detailOrder);
      } else {
        res.status(404).json({ message: "Detail order not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
}
