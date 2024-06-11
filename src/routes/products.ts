import { Router } from "express";
import controller from "../controllers/ProductsController";
import { checkAdm } from "../middlewares/Auth";

const routes = Router();

routes.get("/", controller.list);
routes.post("/", checkAdm, controller.create);
routes.delete("/:id", checkAdm, controller.delete);
routes.put("/", checkAdm, controller.update);

export default routes;