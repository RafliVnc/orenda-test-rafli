import { PrismaClient } from "@prisma/client";
const cors = require("cors");
import express from "express";

const prisma = new PrismaClient();
const app = express();

var corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOption));

app.use(express.json());

app.get(`/product`, async (req, res) => {
  const result = await prisma.product.findMany();
  res.json(result);
});

app.get(`/customer`, async (req, res) => {
  const result = await prisma.customer.findMany();
  res.json(result);
});

app.post(`/product/add`, async (req, res) => {
  const { name, unit, price } = req.body;
  const result = await prisma.product.create({
    data: {
      name,
      unit,
      price,
    },
  });
  res.json(result);
});

app.post(`/customer/add`, async (req, res) => {
  const { name, phone, email, address } = req.body;
  const result = await prisma.customer.create({
    data: {
      name,
      phone,
      email,
      address,
    },
  });
  res.json(result);
});

app.put("/product/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, unit, price } = req.body;
  try {
    const updatedPost = await prisma.product.update({
      where: { id_product: Number(id) || undefined },
      data: { name: name, unit: unit, price: price },
    });
    res.json(updatedPost);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});

app.put("/customer/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;
    try {
      const updatedPost = await prisma.customer.update({
        where: { id_cust: Number(id) || undefined },
        data: { name: name, phone: phone, email: email,address:address },
      });
      res.json(updatedPost);
    } catch (error) {
      res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
  });

  const server = app.listen(3000, () => {
    console.log(`http://localhost:3000`);
  });