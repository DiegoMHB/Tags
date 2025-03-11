import { Op } from "sequelize";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import Post from "../models/Post.model";
import User from "../models/User.model";
import { postsArray } from "./defaultPosts"
import { usersArray } from "./defaultUsers"

const jsonToken = process.env.JSON_TOKEN

//deletes ONLY old post by th Users by EMAIL:
export const deleteExpiredPosts = async () => {
    const now = new Date();
    try {
        const deletedCount = await Post.destroy({
            where: {
                destroyAt: { [Op.lt]: now },
                email: {
                    [Op.or]: [//EMAIL or EMAILS here
                    ]
                }
            },
        });

        console.log(` ${deletedCount} deleted posts`);
    } catch (error) {
        console.error("Error deleting expired Posts", error);
    }
};

//deletes the default Posts:
export const deleteDefaultPosts = async () => {

    try {
        for (const [index, el] of postsArray.entries()) {
            const deleted = await Post.destroy({
                where: {
                    title: el.title,
                },
            });
            console.log('Deleted:', el.title);
        }
    } catch (error) {
        console.error("Error deleting expired Posts", error);
    }
};

//Creates default Posts:
export const createPosts = async () => {
    try {
        let userIndex = 0;
        for (const [index, el] of postsArray.entries()) {
            const user = await User.findOne({ where: { email: `dmhb${userIndex}@gmail.com` } });

            if (!user) {
                console.error(`User not found for email: dmhb${userIndex}@gmail.com`);
                continue;
            }

            console.log('Found User ID:', user.id);
            el.userId = user.id;

            try {
                const newPost = await Post.create(el);
                console.log(`Post ${userIndex} created`);

                // Close after `el.duration` minutes
                setTimeout(async () => {
                    try {
                        const postToDeactivate = await Post.findByPk(newPost.id);
                        if (postToDeactivate)
                            await postToDeactivate.update({ isActive: false });
                    } catch (deleteError) {
                        console.error(`Error closing post ${newPost.id}:`, deleteError);
                    }
                }, el.duration * 60 * 1000);
                if (el.isActive){
                    userIndex++
                }else continue
            } catch (saveError) {
                console.error("Error closing post:", saveError);
            }
        }
    } catch (error) {
        console.error("Error in createPosts:", error);
    }
};

//Populates the DB with default users:
export const Populate = async () => {
    try {
        for (const [index, el] of usersArray.entries()) {

            el.password = "1234" //always 123 --DEV--
            el.password = await bcrypt.hash(el.password, 10);
            const newUser = new User(el);

            //Verifying if userName or Email already exists
            if (await User.findOne({ where: { email: newUser.email } })) throw ({ message: "Email already registered" })
            if (await User.findOne({ where: { userName: newUser.userName } })) throw ({ message: "Username already registered" })

            const response = await newUser.save();

            if (response.dataValues) {
                console.log(`Saved ${index} default user in DB`)
            } else throw ({ message: `Couldnt save ${index} default user in DB` })
        }
    } catch (e) {
        console.log(e)
    }
}
