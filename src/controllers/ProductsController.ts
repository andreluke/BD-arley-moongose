import { Request, Response } from "express";
import Products from "../models/Products";

class ProductsController {
    public async create(req: Request, res: Response): Promise<void> {
        const { name, idcategory } = req.body;
        try {
            const response = await Products.create({ name, idcategory });
            res.send(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Products.find(
            {},
            {},
            {
                sort: { name: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Products.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, name } = req.body;
        try {
            const response = await Products.findByIdAndUpdate(
                id,
                { name },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            }
            else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
            if (e.code === 11000) {
                res.send({ message: `O nome ${name} já está em uso` });
            }
            else if (e.errors?.name) {
                res.send({ message: e.errors.name.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new ProductsController();