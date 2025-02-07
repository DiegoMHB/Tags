import { useState } from "react";
import Landing from "../pages/Landing";
import Map from "../pages/Map";
import NavBarElement from "../components/NavBarElement";
import { linkList } from "../types/appTypes";

export default function RootLayout() {
  const [auth, setAuth] = useState<boolean>(false);

  const links: linkList = [
    { to: "/home", text: "Home", id: 1 },
    { to: "/profile", text: "Profile", id: 1 },
    { to: "/posts", text: "Posts", id: 2 },
    { to: "/map", text: "Map", id: 3 },
  ];

  return (
    <>
      <main className="flex justify-center items-center bg-black" >
        <main className="flex flex-col justify-between h-screen max-w-[400px] max-h-[1000px] ">
          <section className="flex justify-evenly bg-black h-10 items-center ">
            <button className="bg-white " onClick={() => setAuth(!auth)}>
              cheking
            </button>
          </section>

          <section
            className="flex-1 flex align-middle justify-center 
        bg-gradient-to-r from-[#c6eef7] to-[#e0f5e6] 
        h-[88%] rounded-2xl"
          >
            {auth ? <Map /> : <Landing />}
          </section>

          <section className="flex justify-evenly bg-black h-15 items-center max-w-[400px] ">
            {links.map((el) => (
              <NavBarElement key={el.id} link={el.to} text={el.text} />
            ))}
          </section>
        </main>
      </main>
    </>
  );
}
