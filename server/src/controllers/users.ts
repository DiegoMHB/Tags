import { Request,Response } from 'express';
import {bcrypt} from  "bcrypt";
const jwt = require('jsonwebtoken');


export const register = async (req:Request, res: Response) => {
    try {
        const user = req.body;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

       
      } catch (error) {
        if (error.message) {
          return res.status(400).send({ error: error.message });
        }
        res.status(500).send({ error: 'Something happened' });
      }
}