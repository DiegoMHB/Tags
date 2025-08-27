import express from "express";
import { register, login, loginAuto, logout, getUser } from "./controllers/users";
import { newPost, getAllPosts, deletePost, closePost, editPost, getUserPosts, getPostById } from "./controllers/posts";
import { newChat, getChatById, postMessage, getChatsByPostId, getAllMyChats } from "./controllers/chats";
import {sendNotificationVisit} from "./controllers/notifications"


const router = express.Router();

//user

router.post("/register", register);
router.post("/login", login);
router.get("/loginAuto", loginAuto);
router.get("/logOut", logout);

//manage post
router.post("/newPost", newPost);
router.delete("/deletePost", deletePost);
router.patch("/closePost/:id", closePost);
router.patch("/editPost", editPost);


//app
router.get("/getPostById/:id", getPostById);//for tests
router.get("/getUserPosts/:id", getUserPosts);
router.get("/user/:id", getUser);
router.get("/getAllPosts", getAllPosts);

//chats
router.post("/newChat", newChat);
router.post("/postMessage", postMessage)
router.get("/getAllMyChats/:id", getAllMyChats)
router.get("/getChatById/:id", getChatById);
router.get("/getChatsByPostId/:id", getChatsByPostId);

//notifications
router.post("/notificationVisita",sendNotificationVisit)


export default router;