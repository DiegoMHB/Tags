import { Request, Response } from "express";
import Post from "../models/Post.model";
import User from "../models/User.model";

export const newPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = req.body;
        const newPost = new Post(post);
        const response = await newPost.save();


        if (response.dataValues) {
            //save the postId in user.posts
            const user = await User.findByPk(newPost.userId);
            user.posts = user.posts ? [...user.posts, newPost.id] : [newPost.id];
            await user.save();
            //to deactivate post once saved
            setTimeout(async () => {
                const postToDeactivate = await Post.findByPk(response.dataValues.id);
                if (postToDeactivate)
                    await postToDeactivate.update({ isActive: false });

            }, post.duration * 60 * 1000);
            res
                .status(200)
                .send({ post: response.dataValues, message: "Post succesfully created" })
            return
        } else throw ({ message: "Couldnt save POST in DB" })

    } catch (error) {
        if (error.message) {
            res.status(400).send({ error: error.message });
            return
        }
        res.status(500).send({ error: "Something happened: try again" });
        return
    }
}

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await Post.findAll({ where: { isActive: true } });

        if (response) {
            res
                .status(200)
                .send({ posts: response, message: "Posts get" })
            return
        } else throw ({ message: "Couldnt get POSTS from DB" })


    } catch (error) {
        if (error.message) {
            res.status(400).send({ error: error.message });
            return
        }
        res.status(500).send({ error: "Something happened: try again" });
        return
    }
}

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.body
    try {
        const response = await Post.findByPk(id)

        if (response) {
            res
                .status(200)
                .send({ posts: response, message: "Post get" })
            return
        } else throw ({ message: "Couldnt get POST from DB" })


    } catch (error) {
        if (error.message) {
            res.status(400).send({ error: error.message });
            return
        }
        res.status(500).send({ error: "Something happened: try again" });
        return
    }
}


export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;
        const postToDelete = await Post.findByPk(id);
        if (!postToDelete) {
            throw ({ message: "'No such ID" })
        }
        const deleted = await postToDelete.destroy();

        //delete in User.posts 
        const user = await User.findByPk(postToDelete.userId);
        user.posts = user.posts.filter(post => post !== postToDelete.id)
        await user.save();

        if (! await Post.findByPk(id)) {
            res
                .status(200)
                .send({ message: "Post deleted" })
            return
        } else throw ({ message: "Delete didn't work. Try later" })

    } catch (error) {
        if (error.message) {
            res.status(400).send({ error: error.message });
            return
        }
        res.status(500).send({ error: "Something happened: try again" });
        return
    }
}

export const closePost = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const postToDeactivate = await Post.findByPk(id);
        if (!postToDeactivate) {
            throw ({ message: "'No such ID" })
        }
        const closedPost = await postToDeactivate.update({ isActive: false });
        res
            .status(200)
            .send({ message: "Post closed", closedPost })
        return

    } catch (error) {
        if (error.message) {
            res.status(400).send({ error: error.message });
            return
        }
        res.status(500).send({ error: "Something happened: try again" });
        return
    }
}

export const editPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, ...changes } = req.body;
        const [updatedRows] = await Post.update(changes, { where: { id } });
        if (updatedRows === 0) {
            res.status(404).json({ error: "Post not found, or no changes made" });
        }

        const post = await Post.findByPk(id);
        res.send({ message: "Post edited", post });
        return




    } catch (error) {
        if (error.message) {
            res.status(400).send({ error: error.message });
        }
        res.status(500).send({ error: "Something happened: try again" });
        return
    }
}

export const getUserPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const response = await Post.findAll({ where: { userId } })
        if (response) {
            res
                .status(200)
                .send({ posts: response, message: "Post get" })
            return
        } else throw ({ message: "Couldnt get POST from DB" })

    } catch (error) {
        if (error.message) {
            res.status(400).send({ error: error.message });
            return
        }
        res.status(500).send({ error: "Something happened: try again" });
        return
    }
}


