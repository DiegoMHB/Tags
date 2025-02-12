import { Request,Response } from 'express';
import bcrypt from  "bcrypt";
import User from '../models/User.model';
// import jwt from 'jsonwebtoken';



export const register = async (req:Request, res: Response) : Promise<any> => {
    try {
        const user = req.body;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        console.log('CONTROLLER1111',user)
        
        const newUser = await User.create({...user});
        console.log('CONTROLLER222',newUser)
        return res.status(201).json({
            message: "Successfully created",
            user:{id:newUser.id,
                name:newUser.name,
                userName:newUser.userName,
                email:newUser.email,
                password:"",
                city: newUser.city,
                profilePicture :newUser.profilePicture
            }
        })

       
      } catch (error) {
        if (error.message) {
         return  res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: 'Something happened' });
      }
}