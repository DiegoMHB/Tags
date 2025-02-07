import Landing from "../pages/Landing";
import Map from "../pages/Map";
import NavBarElement from "../components/NavBarElement";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { links } from "../data/links";
import { appStore } from "../zustand/appStore";

export default function RootLayout() {

    const {auth, setAuth, mapRender} = appStore();
    const navigate = useNavigate()
    
    const url = useLocation().pathname;

    const linkRendered = url === "/map"  ? links.filter((li) => li.text !== "Map") : links.filter((li) => li.text !== "Home")

    console.log(linkRendered )


  return (
    <>
      <main className="flex justify-center items-center bg-black" >
        <main className="flex flex-col justify-between h-screen max-w-[400px] max-h-[1000px] ">
          <section className="flex justify-evenly bg-black h-10 items-center ">
            <button className="bg-white " onClick={setAuth}>
              cheking
            </button>
          </section>

          <section
            className="flex-1 flex align-middle justify-center 
        bg-gradient-to-r from-[#c6eef7] to-[#e0f5e6] 
        h-[88%] rounded-2xl"
          >
            { !auth && !mapRender? <Landing /> : !auth && mapRender ? <Map /> : <Outlet /> }
          </section>

          <section className="flex justify-evenly bg-black h-15 items-center max-w-[400px] ">
            {linkRendered.map((el) => (
              <NavBarElement key={el.id} link={el.to} text={el.text} />
            ))}
          </section>
        </main>
      </main>
    </>
  );
}
