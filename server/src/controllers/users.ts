import { Request, Response } from 'express';
import User from '../models/User.model';
import bcrypt from 'bcrypt'



export const register = async (req: Request, res: Response): Promise<any> => {

    try {
        const data = req.body;
        console.log('CONTROLLER1111', data)
        data.password = await bcrypt.hash(data.password, 10);
        const user = new User(data);
        console.log('CONTROLLER1111', user)
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
                profilePicture: user.profilePicture
            }
        })


    } catch (error) {
        if (error.message) {
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: 'Something happened' });
    }
}