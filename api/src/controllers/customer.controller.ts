import { Request, Response } from "express";
import {
  DetailOrder,
  Order,
  Prisma,
  PrismaClient,
  Product,
} from "@prisma/client";

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

  async tes(req: Request, res: Response) {
    try {
      const result = await prisma.customer.findMany({
        where: {},
        select: {
          custId: true,
          name: true,
          phone: true,
          email: true,
          address: true,
          order: true,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async tesBuat(req: Request, res: Response) {
    try {
      const { name, phone, email, address, totalOrder, discount } = req.body;
      const result = await prisma.customer.create({
        data: {
          name,
          phone,
          email,
          address,
          order: {
            create: { totalOrder, discount },
          },
        },
      });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async tesTampilOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await prisma.detailOrder.findMany({
        where: { detailOrderId: Number(id) || undefined },
        // select: {
        //   orderUnit: true,
        //   order: {
        //     select: {
        //       orderId: true,
        //       totalOrder: true,
        //       discount: true,
        //       customer: {
        //         select: {
        //           custId: true,
        //           name: true,
        //         },
        //       },
        //     },
        //   },
        //   product: {
        //     select: {
        //       productId: true,
        //       name: true,
        //     },
        //   },
        // },
        include: {
          order: {
            select: {
              orderId: true,
              totalOrder: true,
              discount: true,
              customer: true,
            },
          },
          product: true,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async tesTampil(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await prisma.customer.findMany({
        where: { custId: Number(id) || undefined },
        include: {
          order: {
            select: {
              orderId: true,
              totalOrder: true,
              discount: true,
              DetailOrder: {
                select: {
                  detailOrderId: true,
                  orderUnit: true,
                  product: {
                    select: {
                      productId: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
  async tesBuatOrder(req: Request, res: Response) {
    try {
      const { totalOrder, discount, custId, orderDetails } = req.body;
      const result = await prisma.order.create({
        data: {
          totalOrder,
          discount,
          customer: {
            connect: {
              custId,
            },
          },
          DetailOrder: {
            createMany: {
              data: orderDetails.map((detail: DetailOrder) => ({
                orderUnit: detail.orderUnit,
                ProductId: detail.ProductId,
              })),
            },
          },
        },
        include: {
          DetailOrder: true,
          customer: true,
        },
      });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
        res: err,
      });
    }
  }
}
