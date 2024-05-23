import { Router } from "express";
import category from "./category"
import products from "./products"
import user from "./user"
import spents from "./spents"
import { validadeAcess } from "../middlewares/Auth";

const router = Router()

router.use("/categoria", validadeAcess, category)
router.use("/produto", validadeAcess, products)
router.use("/usuario", user)
router.use("/gasto", validadeAcess, spents)

export default router