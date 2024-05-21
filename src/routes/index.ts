import { Router } from "express";
import category from "./category"
import products from "./products"

const router = Router()

router.use("/categoria", category)
router.use("/produto", products)

export default router