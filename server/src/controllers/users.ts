import { Request, Response } from 'express';
import User from '../models/User.model';
import bcrypt from 'bcrypt'



export const register = async (req: Request, res: Response): Promise<any> => {

    try {
        const data = req.body;
        data.password = await bcrypt.hash(data.password, 10);
        const user = new User(data);
        user.save();

        return res.status(201).json({
            message: "Successfully created",
            user: {
                id: user.id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                password: "",
                city: user.city,
                profilePicture: user.profilePicture,
                createdAt: user.createdAt
            }
        })


    } catch (error) {
        if (error.message) {
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: 'Something happened' });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {

    try {
        const data = req.body;

        const user = await User.findOne({ where: { email: data.email } });

        if (!user) throw new Error('Email not registered');

        const check = await bcrypt.compare(data.password, user.password)
        if (check) {
            return res.status(201).json({
                message: "Logged in",
                user: {
                    id: user.id,
                    name: user.name,
                    userName: user.userName,
                    email: user.email,
                    password: "",
                    city: user.city,
                    profilePicture: user.profilePicture,
                    createdAt: user.createdAt
                }
            })

        } else {
            throw new Error('Wrong Password')
        }



    } catch (e) {
        return res.status(400).send({ error: e })
    }

}