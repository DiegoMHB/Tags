import express from "express";
import { register, login, loginAuto, logout, getUser } from "./controllers/users";
import { newPost, getAllPosts, deletePost, closePost, editPost, getUserPosts, getPostById } from "./controllers/posts";
import { newChat, getChatById, postMessage, getChatsByPostId, getAllMyChats } from "./controllers/chats";


const router = express.Router();

//user

router.post("/register", register);
router.post("/login", login);
router.get("/loginAuto", loginAuto);
router.get("/logOut", logout);

//manage post
router.post("/newPost", newPost);
router.get("/getAllPosts/:id", getUserPosts);
router.delete("/deletePost", deletePost);
router.patch("/closePost/:id", closePost);
router.patch("/editPost", editPost);


//app post
router.get("/getPostById/:id", getPostById);//for tests
router.get("/user/:id", getUser);
router.get("/getAllPosts", getAllPosts);

//chats
router.get("/getAllMyChats/:id", getAllMyChats)
router.get("/getChatById/:id", getChatById);
router.get("/getChatsByPostId/:id", getChatsByPostId);
router.post("/newChat", newChat);
router.post("/postMessage", postMessage)


export default router;