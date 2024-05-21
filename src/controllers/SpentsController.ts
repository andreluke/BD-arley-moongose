import { Request, Response } from "express";
import Spents from "../models/Spents";

class SpentsController {
    public async create(req: Request, res: Response): Promise<void> {
        const { iduser, idproduct, datetime, value } = req.body;
        try {
            const response = await Spents.create({ iduser, idproduct, datetime, value });
            res.send(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Spents.find(
            {},
            {},
            {
                sort: { iduser: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Spents.findByIdAndDelete(id);
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
            const response = await Spents.findByIdAndUpdate(
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
                res.send({ message: e });
        }
    }
}

export default new SpentsController();