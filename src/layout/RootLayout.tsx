import { useState } from "react";
import Landing from "../pages/Landing";
import Map from "../pages/Map";
import NavBarElement from "../components/NavBarElement";
import { linkList } from "../types/appTypes";

export default function RootLayout() {
  const [auth, setAuth] = useState<boolean>(false);

  const links : linkList= [
    {to: "/profile", text:"Profile"},
    {to: "/posts", text:"Posts"},
    {to: "/map", text:"Map"},
  ]

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <div>
          {auth ? <Map /> : <Landing />}
          <button onClick={() => setAuth(!auth)}>cheking</button>
        </div>

        <div>
            {links.map((el)=> 
            <NavBarElement key={el.el} link={el.to} text={el.text} />)}
        </div>
      </div>
    </>
  );
}
