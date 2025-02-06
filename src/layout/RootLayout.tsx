import { useState } from "react";
import Landing from "../pages/Landing";
import Map from "../pages/Map";
import NavBarElement from "../components/NavBarElement";
import { linkList } from "../types/appTypes";

export default function RootLayout() {
  const [auth, setAuth] = useState<boolean>(false);

  const links: linkList = [
    { to: "/profile", text: "Profile", id: 1 },
    { to: "/posts", text: "Posts", id: 2 },
    { to: "/map", text: "Map", id: 3 },
  ];

  return (
    <>
      <div className="flex flex-col justify-between h-screen ">
        <div className="flex justify-evenly bg-black h-10 items-center ">
          <button className="bg-white " onClick={() => setAuth(!auth)}>
            cheking
          </button>
        </div>

        <div className="flex align-middle justify-center bg-gradient-to-r from-[#c6eef7] to-[#e0f5e6] m-2 mb-0 h-screen rounded-2xl">
          {auth ? <Map /> : <Landing />}
        </div>

        <div className="flex justify-evenly bg-black h-15 items-center ">
          {links.map((el) => (
            <NavBarElement key={el.id} link={el.to} text={el.text} />
          ))}
        </div>
      </div>
    </>
  );
}
