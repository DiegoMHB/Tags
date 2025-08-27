import { Request, Response } from "express";
import {sendMail} from "../dev/notifications"


const mail = process.env.EMAIL_USER

export const sendNotificationVisit = async (req:Request, res: Response) => {
     try {
    await sendMail(mail, "han entrado","alguien entro en tu cuenta!")
    res.status(200).send({ message: "Mail enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error enviando mail" });
  }
}