import { Router } from "express";
import CustomerController from "../controllers/customer.controller";

class CustomerRoutes {
  router = Router();
  controller = new CustomerController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Customer
    this.router.post("/", this.controller.create);

    // Retrieve all Customers
    this.router.get("/", this.controller.findAll);

    this.router.get("/tes/:id", this.controller.tesTampil);

    this.router.get("/tes", this.controller.tes);
    this.router.get("/tes1/:id", this.controller.tesTampilOrder);
    this.router.post("/tes", this.controller.tesBuat);
    this.router.post("/tes1", this.controller.tesBuatOrder);

    // Retrieve a single Customer with id
    this.router.get("/:id", this.controller.findOne);

    // Update a Customer with id
    this.router.put("/:id", this.controller.update);

    // Delete a Customer with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new CustomerRoutes().router;
