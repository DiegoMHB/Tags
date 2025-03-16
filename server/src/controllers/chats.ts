import Chat from "../models/Chat.model";
import { Request, Response } from "express";
import Post from "../models/Post.model";
import { ChatListElement } from "../types";




export const newChat = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId, ownerId, notOwnerId } = req.body;
        const newChat = new Chat({ postId, ownerId, notOwnerId, messages: [] });
        const responseChat = await newChat.save();
        if (responseChat.dataValues) {

            //returning the post with the chatList updated
            const post = await Post.findByPk(postId);
            const chatListElement : ChatListElement ={
                notOwnerId: newChat.notOwnerId,
                chatId : newChat.id
            }
            post.chatList = [...post.chatList, chatListElement];
            const responsePost = await post.save()

            res
                .status(200)
                .send({
                    chat: responseChat.dataValues,
                    post: responsePost.dataValues,
                    message: "Chat succesfully created"
                })
            return
        } else throw ({ message: "Couldnt create Chat in DB" })


    } catch (e) {
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
        console.log(id,"-----------------------")
        const response = await Chat.findByPk(id)
        console.log("--------",response)
        if (response) {
            res
                .status(200)
                .send({ chat: response, message: "Chat get" })
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
            owner: chat.ownerId == userId ? true : false,
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