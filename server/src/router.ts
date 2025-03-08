import express from "express";
import { register, login, logout, getUser } from "./controllers/users";
import { newPost, getPosts, deletePost,editPost,getUsersPosts } from "./controllers/posts";


const router = express.Router();

//user
//TODO: post no con gets... poner :params

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user/:id", getUser);

//post

router.get("/getPosts", getPosts);
router.post("/newPost", newPost);
router.post("/getUsersPosts", getUsersPosts);
router.delete("/deletePost", deletePost);
router.patch("/editPost", editPost);


export default router;