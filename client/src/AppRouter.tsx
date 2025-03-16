import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Landing from "./pages/Landing";
import Tags from "./pages/Tags";
import About from "./pages/About";
import Post from "./pages/Post";
import PostForm from "./pages/PostForm";
import Chat from "./pages/Chat";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/about" element={<About />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/home" element={<Landing />} />
      <Route path="/map" element={<Map />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/postForm" element={<PostForm />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/tags" element={<Tags />} />
    </Route>
  )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
