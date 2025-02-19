import express from "express";
import { register, login, logout } from "./controllers/users";
import { newPost, getPosts, deletePost,getActivePost } from "./controllers/posts";


const router = express.Router();

//user

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

//post

router.post("/newPost", newPost);

router.get("/getPosts", getPosts);
router.post("/getActivePost", getActivePost);

router.delete("/deletePost", deletePost);


export default router;