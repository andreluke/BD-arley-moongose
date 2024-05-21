import { Request, Response } from "express";
import User from "../models/User";

class UserController {
    public async create(req: Request, res: Response): Promise<void> {
        const { mail, password } = req.body;
        try {
            const response = await User.create({ mail, password });
            res.send(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await User.find(
            {},
            {},
            {
                sort: { mail: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await User.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, mail } = req.body;
        try {
            const response = await User.findByIdAndUpdate(
                id,
                { mail },
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
                res.send({ message: `O e-mail ${mail} já está em uso` });
            }
            else if (e.errors?.mail) {
                res.send({ message: e.errors.mail.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new UserController();