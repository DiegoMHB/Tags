import Chat from "../models/Chat.model";
import { Request, Response } from "express";




export const newChat = async (req: Request, res: Response): Promise<void> => {
    try {
        const {postId, ownerId, notOwnerId} = req.body;
        const newChat= new Chat({postId, ownerId,notOwnerId, messages:[]});
        const response = await newChat.save();
        if(response.dataValues){
            res
            .status(200)
            .send({ post: response.dataValues, message: "Chat succesfully created" })
        return
        }else throw ({ message: "Couldnt create Chat in DB" })
       

    }catch(e){
        if (e.message) {
            res.status(400).send({ error: e.message });
        }
        res.status(500).send({ error: "Something happened: try again" });
        return
    }


}

export const getChatById = async (req: Request, res: Response): Promise<void> => {

    try {
        const id = req.params.id;
        const response = await Chat.findAll({ where: { id } })
        if (response) {
            res
                .status(200)
                .send({ posts: response, message: "Chat get" })
            return
        } else throw ({ message: "Couldnt get CHat from DB" })

    } catch (error) {
        if (error.message) {
            res.status(400).send({ error: error.message });
            return
        }
        res.status(500).send({ error: "Something happened: try again" });
        return
    }
}

export const newMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { chatId, message, userId } = req.body;

        const chat = await Chat.findByPk(chatId);
        if (!chat) {
            res.status(404).json({ error: "Chat not found" });
            return;
        }
       
        const newMsg = {
            owner: chat.ownerId == userId? true:false, 
            date: new Date().toISOString(),
            content: message,
        };

        // Actualizar la lista de mensajes del chat
        const updatedMessages = [...chat.messages, newMsg];

        // Guardar en la base de datos
        await chat.update({ messages: updatedMessages });

        res.status(200).json({ success: true, message: "Message added successfully", chat });
    } catch (error) {
        console.error("Error adding new message:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};