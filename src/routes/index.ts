import { Router } from "express";
import category from "./category"
import products from "./products"
import user from "./user"
import spents from "./spents"

const router = Router()

router.use("/categoria", category)
router.use("/produto", products)
router.use("/usuario", user)
router.use("/gasto", spents)

export default router