import Landing from "../pages/Landing";
import Map from "../pages/Map";
import NavBarElement from "../components/NavBarElement";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { links } from "../data/listUtilities";
import { appStore } from "../zustand/appStore";
import { useEffect } from "react";
import { userStore } from "../zustand/userStore";

export default function RootLayout() {
  const { mapRender, authUserActivePost } = appStore();
  const { auth, user } = userStore();
  const url = useLocation().pathname;
  const navigate = useNavigate();

  const linkRendered = auth ? links.online : links.offline;

  //if online: go to profile
  useEffect(() => {
    if (auth) {
      navigate("/map");
    } else navigate("/");
  }, [auth, navigate]);
  //w-full flex-1
  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen max-w-[400px]  bg-[#00061A] m-auto ">
        <section
          className="
        flex justify-evenly bg-gradient-to-b from-[#00062A] to-[#00061A] h-10 w-full items-center "
        ></section>

        <section
          className="flex-1 flex align-middle justify-center 
        bg-gradient-to-r from-[#c6eef7] to-[#e0f5e6] 
        h-[100%] w-[100%] rounded-2xl
        overflow-y-auto scrollbar-hidden"
        >
          {url === "/" && !mapRender ? (
            <Landing />
          ) : url === "/" && mapRender ? (
            <Map />
          ) : (
            <Outlet />
          )}
        </section>

        <section className="flex justify-evenly bg-gradient-to-t from-[#00062A] to-[#00061A]  h-12 min-h-12 w-full  items-center max-w-[400px] ">
          {linkRendered.map((el) =>
            authUserActivePost &&         
            el.text == "New Post" ? null : !authUserActivePost &&
              el.text == "Post" ? null : (
              <NavBarElement
                key={el.id}
                link={
                  el.to === "/post"
                    ? el.to + `/${authUserActivePost!.id}`
                    : el.to === "/chat"
                    ? el.to + `/${user.id}`:
                    el.to

                }
                text={el.text}
              />
            )
          )}
        </section>
      </main>
    </>
  );
}
