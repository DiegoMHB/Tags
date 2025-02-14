import Landing from "../pages/Landing";
import Map from "../pages/Map";
import NavBarElement from "../components/NavBarElement";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { links } from "../data/links";
import { appStore } from "../zustand/appStore";
import { useEffect } from "react";
import { userStore } from "../zustand/userStore";

export default function RootLayout() {
  const {  mapRender } = appStore();
  const {  auth } = userStore();
  const url = useLocation().pathname;
  const navigate = useNavigate();

  const linkRendered =
    auth
      ? links.online
      : links.offline

//if online go to profile
  useEffect(() => {
    if (auth) {
      navigate("/profile");
    }
    else  navigate("/")
  }, [auth, navigate]);

  return (
    <>
      <main className="flex justify-center items-center]">
        <main className="flex flex-col justify-between items-center h-screen max-w-[400px]  bg-[#00061A] ">
          <section className="flex justify-evenly bg-gradient-to-b from-[#00062A] to-[#00061A] h-10 w-full items-center ">
           
          </section>

          <section
            className="flex-1 flex align-middle justify-center 
        bg-gradient-to-r from-[#c6eef7] to-[#e0f5e6] 
        h-[100%] w-[100%] rounded-2xl"
          >
            {url === "/" && !mapRender ? (
              <Landing />
            ) : url === "/" && mapRender ? (
              <Map />
            ) : (
              <Outlet />
            )}
          </section>

          <section className="flex justify-evenly bg-gradient-to-t from-[#00062A] to-[#00061A]  h-12 w-full  items-center max-w-[400px] ">
            {linkRendered.map((el) => (
              <NavBarElement key={el.id} link={el.to} text={el.text} />
            ))}
          </section>
        </main>
      </main>
    </>
  );
}
