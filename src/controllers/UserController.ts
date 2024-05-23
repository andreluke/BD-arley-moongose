import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

class UserController {
    public async create(req: Request, res: Response): Promise<void> {
        const { mail, password, profile } = req.body;
        if (!mail && !password) {
            res.status(401).json({ erro: "Forneça o e-mail e senha" });
        }else{
        try {
            const response = await User.create({ mail, password, profile });
            res.send(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }
    }

    public async login(req: Request, res: Response) {
        const { mail, password } = req.body;

        

        const user = await User.findOne({
            mail
        });

        if (!user) {
            return res.status(401).json({ message: 'Email não encontrado.' });
        }
        console.log("Email", user);
       
        if (!password) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        const token = jwt.sign({ userId: user._id }, 'token', { expiresIn: '1h' });
        res.status(200).json({ message: 'Logado com sucesso.', user, token })
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

    public async updatemail(req: Request, res: Response): Promise<void> {
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

    public async updasenha(req: Request, res: Response): Promise<void> {
        const { id, password } = req.body;
        try {
            const response = await User.findByIdAndUpdate(
                id,
                { password },
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
           
            if (e.errors?.mail) {
                res.send({ message: e.errors.password.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new UserController();