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


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="/map" element={<Map /> } />
            <Route path="/profile" element={<Profile /> } />
            <Route path="/posts" element={<Posts /> } />
           

        </Route>
    )
)

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

