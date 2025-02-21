import express from "express";
import { register, login, logout,getUser } from "./controllers/users";
import { newPost, getPosts, deletePost,getActivePost } from "./controllers/posts";


const router = express.Router();

//user

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user/:id", getUser);

//post

router.get("/getPosts", getPosts);
router.post("/newPost", newPost);
router.post("/getPost", getActivePost);
router.delete("/deletePost", deletePost);


export default router;