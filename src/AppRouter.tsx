import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Landing from "./pages/Landing";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/home" element={<Landing />} />
      <Route path="/map" element={<Map />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
    </Route>
  )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
