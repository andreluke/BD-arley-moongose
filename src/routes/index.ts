import { Router } from "express";
import category from "./category"
import products from "./products"
import user from "./user"
import spents from "./spents"
import { validadeAcess } from "../middlewares/Auth";

const routes = Router()

routes.use("/usuario", user);
routes.use("/categoria", validadeAcess, category);
routes.use("/produto", validadeAcess, products);
routes.use("/gasto", validadeAcess, spents);

export default routes