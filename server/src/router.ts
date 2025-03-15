import express from "express";
import { register, login, logout, getUser } from "./controllers/users";
import { newPost, getAllPosts, deletePost, closePost, editPost, getUserPosts } from "./controllers/posts";


const router = express.Router();

//user
//TODO: post no con gets... poner :params

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user/:id", getUser);

//user post (auth)
router.get("/getAllPosts/:id", getUserPosts);
router.delete("/deletePost", deletePost);
router.post("/newPost", newPost);
router.patch("/closePost/:id", closePost);
router.patch("/editPost", editPost);


//users post (others)
router.get("/getAllPosts", getAllPosts);


export default router;