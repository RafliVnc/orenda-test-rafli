import { Application } from "express";
import ProductRoutes from "./product.routers";
import customerRoutes from "./customer.routers";

export default class Routes {
  constructor(app: Application) {
    app.use("/product", ProductRoutes);
    app.use("/customer", customerRoutes);
    app.use("/order", customerRoutes);
  }
}