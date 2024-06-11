import { Router } from "express";
import controller from "../controllers/UserController";
import { checkAdm, validadeAcess } from "../middlewares/Auth";

const router = Router();

router.get("/", validadeAcess, checkAdm, controller.list);
router.post("/", controller.create);
router.post("/login", controller.login);
router.delete("/", validadeAcess, controller.delete);
router.put("/mail", validadeAcess, controller.updatemail);
router.put("/senha", validadeAcess, controller.updasenha);

export default router