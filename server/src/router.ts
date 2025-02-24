import express from "express";
import { register, login, logout, getUser } from "./controllers/users";
import { newPost, getPosts, deletePost, getActivePost,editPost } from "./controllers/posts";


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
router.patch("/editPost", editPost);


export default router;