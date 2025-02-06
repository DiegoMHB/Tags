import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Map from "./pages/Map";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="/map" element={<Map /> } />
           

        </Route>
    )
)

export default function AppRouter() {
  return <RouterProvider router={router} />;
}


// const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<RootLayout />}>
  
//       </Route>
//     )
//   );