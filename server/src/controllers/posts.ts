import { Request, Response } from "express";
import Post from "../models/Post.model";




    export const newPost = async (req: Request, res: Response): Promise<any> => {
        try {
            const post = req.body;
            const newPost = new Post(post);
            const response = await newPost.save();

            if (response.dataValues) {
                
                //to delete post once saved
                //This doesnt send anything to the user, so TO-DO
                setTimeout(async () => {
                    const postToDelete = await Post.findByPk(response.dataValues.id);
                    await postToDelete.destroy();
                }, post.duration * 60 * 1000);

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
   
    export const getPosts = async (req: Request, res: Response): Promise<any> => {
        try {
            const response = await Post.findAll({});
           
            if (response) {
                

                return res
                    .status(200)
                    .send({ posts: response, message: "Posts get" })
            } else throw ({ message: "Couldnt get POST from DB" })

        } catch (error) {
            if (error.message) {
                return res.status(400).send({ error: error.message });
            }
            return res.status(500).send({ error: "Something happened: try again" });
        }
    }
