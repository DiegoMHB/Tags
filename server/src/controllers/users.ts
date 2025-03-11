import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcrypt";
import  jwt from 'jsonwebtoken';

const jsonToken = process.env.JSON_TOKEN

export const register = async (req: Request, res: Response): Promise<any> => {

    try {
        const user = req.body;
        user.password = "1234" //always 123 --DEV--
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = new User(user);

        //Verifying if userName or Email already exists
        if (await User.findOne({ where: { email: newUser.email } })) throw ({ message: "Email already registered" })
        if (await User.findOne({ where: { userName: newUser.userName } })) throw ({ message: "Username already registered" })

        const response = await newUser.save();

        if (response.dataValues) {
            response.password = "";
            const token = jwt.sign(
                { id: response.id, username: response.userName },
                jsonToken,
                { expiresIn: '1h' });

            return res
                .cookie('access_token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                })
                .status(200)
                .send({ user: response.dataValues, message: "Login successfull" })
        } else throw ({ message: "Couldnt save USER in DB" })


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
            user.password = '';
            const token = jwt.sign(
                { id: user.id, username: user.userName },
                jsonToken,
                { expiresIn: '1h' });

            return res
                .cookie('access_token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                })
                .status(200)
                .send({ user: user.dataValues, message: "Login successfull" })

        } else {
            throw ({ message: "Wrong Password" })
        }

    } catch (error) {
        if (error.message) {
            return res.status(400).send({ error: "Something happened. Try again"});
        }
        return res.status(500).send({ error: "Something happened. Try again" });
    }

}

export const logout = async (req: Request, res: Response): Promise<any> => {
    return res
        .clearCookie('access_token', { httpOnly: true, secure: false, sameSite: 'strict' })
        .send({ message: 'Cookie deleted, session expired', ok: true });
}

export const getUser = async (req: Request, res: Response) : Promise<any>  => {
    try {
        const {id} = req.params;    
        console.log('ID----------------->',id)
        const response = await User.findByPk(id)
        if (response) {
            return res
                .status(200)
                .send({ user: response, message: "User get" })
        } else throw ({ message: "Couldnt get User from DB" })

    } catch (error) {
        if (error.message) {
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: "Something happened: try again" });
    }
}