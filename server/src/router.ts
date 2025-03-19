import express from "express";
import { register, login, logout, getUser } from "./controllers/users";
import { newPost, getAllPosts, deletePost, closePost, editPost, getUserPosts,getPostById } from "./controllers/posts";
import { newChat,getChatById,newMessage,getChatsByPostId } from "./controllers/chats";


const router = express.Router();

//user

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

//user post (auth)
router.get("/getAllPosts/:id", getUserPosts);
router.get("/getPostById/:id", getPostById);
router.delete("/deletePost", deletePost);
router.post("/newPost", newPost);
router.patch("/closePost/:id", closePost);
router.patch("/editPost", editPost);


//users post (others)
router.get("/user/:id", getUser);
router.get("/getAllPosts", getAllPosts);

//chats
router.post("/newChat", newChat);
router.get("/getChatById/:id", getChatById);
router.get("/getChatsByPostId/:id", getChatsByPostId);
router.post("/newMessage", newMessage)


export default router;