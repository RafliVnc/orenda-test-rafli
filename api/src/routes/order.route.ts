import { Router } from "express";
import OrderController from "../controllers/order.controller";


class OrderRoutes {
  router = Router();
  controller = new OrderController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
     // Create a new Order
     this.router.post("/", this.controller.create);
     // Get order detail
     this.router.get("/:id", this.controller.getDetailOrder);
  }
}

export default new OrderRoutes().router;