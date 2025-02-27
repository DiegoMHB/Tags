import { Op } from "sequelize";
import  Post  from "../models/Post.model"; 

export const deleteExpiredPosts = async (): Promise<void> => {
    const now = new Date();
    try {
        const deletedCount = await Post.destroy({
            where: {
                destroyAt: { [Op.lt]: now }, 
            },
        });

        console.log(` ${deletedCount} deleted posts`);
    } catch (error) {
        console.error("Error deleting expired Posts or no posts to delete", error);
    }
};