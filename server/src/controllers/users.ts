import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcrypt"



export const register = async (req: Request, res: Response): Promise<any> => {

    try {
        const data = req.body;
        data.password = "1234" //always 123 --DEV--
        data.password = await bcrypt.hash(data.password, 10);
        const user = new User(data);
        //Verifying if userName or Email already exists
        if (await User.findOne({ where: { email: user.email } })) throw ({ message: "Email already registered" })
        if (await User.findOne({ where: { userName: user.userName } })) throw ({ message: "Username already registered" })

        const response = await user.save();

        if (response.dataValues) {
            return res.status(201).json({
                message: "Successfully created",
                user: {
                    ...response.dataValues,
                    password: ""
                }
            })
        }


    } catch (error) {
        if (error.message) {
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: "Something happened: try again" });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {

    try {
        const data = req.body;

        const user = await User.findOne({ where: { email: data.email } });

        if (!user) throw ({ message: "Email not registered" })

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
            throw({ message: "Wrong Password" })
        }

    } catch (error) {
        if (error.message) {
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: "Something happened: try again" });
    }

}