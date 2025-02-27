import { Op } from "sequelize";
import Post from "../models/Post.model";
import User from "../models/User.model";
import { postsArray } from "./posts"

export const deleteExpiredPosts = async () => {
    const now = new Date();
    try {
        const deletedCount = await Post.destroy({
            where: {
                destroyAt: { [Op.lt]: now },
            },
        });

        console.log(` ${deletedCount} deleted posts`);
    } catch (error) {
        console.error("Error deleting expired Posts", error);
    }
};

export const deleteDefaultPosts = async () => {

    try {
        for (const [index, el] of postsArray.entries()) {
            const deleted = await Post.destroy({
                where: {
                    title: el.title,
                },
            });
            console.log('Deleted:',el.title);
        }
    } catch (error) {
        console.error("Error deleting expired Posts", error);
    }
};

export const createPosts = async () => {
    try {
        for (const [index, el] of postsArray.entries()) {
            const user = await User.findOne({ where: { email: `dmhb${index + 1}@gmail.com` } });

            if (!user) {
                console.error(`User not found for email: dmhb${index + 1}@gmail.com`);
                continue;
            }

            console.log('Found User ID:', user.id);
            el.userId = user.id;

            try {
                const newPost = await Post.create(el);
                console.log(`Post ${index + 1} created`);

                // Schedule deletion after `el.duration` minutes
                setTimeout(async () => {
                    try {
                        const postToDelete = await Post.findByPk(newPost.id);
                        if (postToDelete) {
                            await postToDelete.destroy();
                            console.log(`Post ${newPost.id} deleted after ${el.duration} minutes.`);
                        }
                    } catch (deleteError) {
                        console.error(`Error deleting post ${newPost.id}:`, deleteError);
                    }
                }, el.duration * 60 * 1000);
            } catch (saveError) {
                console.error("Error saving post:", saveError);
            }
        }
    } catch (error) {
        console.error("Error in createPosts:", error);
    }
};
