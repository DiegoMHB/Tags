import { Request, Response } from "express";
import Post from "../models/Post.model";
import User from "../models/User.model";





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

export const deletePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.body;    
        const postToDelete = await Post.findByPk(id);
        if(!postToDelete){
            throw({ message: "'No such ID" })
        }
        const deleted = await postToDelete.destroy();
        if(! await Post.findByPk(id)){
            return res
                .status(200)
                .send({ message: "Post deleted" })
         }else throw({ message: "Delete didn't work. Try later" })

    } catch (error) {
        if (error.message) {
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: "Something happened: try again" });
    }
}

export const getActivePost = async (req: Request, res: Response): Promise<any> => {
    console.log('aaaaaaaaaaaaaaaaa',req.body)
    try {
        const {userId} = req.body;    
        console.log('------------->',userId)
        const response = await Post.findOne({where: {userId}})
        if (response) {
            return res
                .status(200)
                .send({ post: response, message: "Post get" })
        } else throw ({ message: "Couldnt get POST from DB" })

    } catch (error) {
        if (error.message) {
            return res.status(400).send({ error: error.message });
        }
        return res.status(500).send({ error: "Something happened: try again" });
    }
}


