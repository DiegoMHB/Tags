import { Request, Response } from "express";
import Post from "../models/Post.model";




export const newPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const post = req.body;
        const newPost = new Post(post);
        console.log('----', newPost)
        const response = await newPost.save();

        if (response.dataValues) {

            setTimeout(async () => {
                const postToDelete = await Post.findByPk(response.dataValues.id);
                console.log('delete---------->',postToDelete)
                await postToDelete.destroy();
                console.log("DELETED")
            }, 15 * 1000);

            return res
                .status(200)
                .send({ post: response.dataValues, message: "Post succesfully created" })
        } else throw ({ message: "Couldnt save POST in DB" })

    } catch (error) {
        if (error.message) {
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: "Something happened: try again" });
    }
}
