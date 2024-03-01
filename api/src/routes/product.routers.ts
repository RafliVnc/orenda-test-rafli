import { Router } from "express";
import ProductController from "../controllers/product.controller";


class ProductRoutes {
  router = Router();
  controller = new ProductController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
     // Create a new Customer
     this.router.post("/", this.controller.create);

     // Retrieve all Customers
     this.router.get("/", this.controller.findAll);
 
     // Retrieve a single Customer with id
     this.router.get("/:id", this.controller.findOne);
 
     // Update a Customer with id
     this.router.put("/:id", this.controller.update);
 
     // Delete a Customer with id
     this.router.delete("/:id", this.controller.delete);
  }
}

export default new ProductRoutes().router;