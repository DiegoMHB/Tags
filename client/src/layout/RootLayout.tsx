import Landing from "../pages/Landing";
import Map from "../pages/Map";
import NavBarElement from "../components/buttons/NavBarElement";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { links } from "../data/listUtilities";
import { appStore } from "../zustand/appStore";
import { useEffect, useState } from "react";
import { userStore } from "../zustand/userStore";
import SearchBar from "../components/SearchBar";

export default function RootLayout() {
  const { mapRender, authUserActivePost } = appStore();
  const { auth, user } = userStore();
  const url = useLocation().pathname;
  const navigate = useNavigate();
  const[showSearch, setShowSearch]= useState<boolean>(false)

  const linkRendered = auth ? links.online : links.offline;

  //if online: go to profile
  useEffect(() => {
    if (auth) {
      navigate("/map");
    } else navigate("/");
  }, [auth, navigate]);

  useEffect(() => {
    if (url.startsWith("/profile") || url.startsWith("/chat") || url === "/tags") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [url]);


  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen max-w-[400px] m-auto ">
        {showSearch && (
          <section
            className="
        flex justify-evenly bg-[#e0f5e9] h-20 w-full items-center "
          >
            {" "}
            <SearchBar></SearchBar>{" "}
          </section>
        )}

        <section
          className="flex-1 flex align-middle justify-center 
        bg-gradient-to-r from-[#c6eef7] to-[#e0f5e6] 
        h-[100%] w-[100%]
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

        <section className="flex justify-evenly bg-[#e0f5e9]  h-12 min-h-12 w-full  items-center max-w-[400px] ">
          {linkRendered.map((el) =>
            authUserActivePost &&
            el.text == "New Post" ? null : !authUserActivePost &&
              el.text == "Post" ? null : (
              <NavBarElement
                url={url}
                key={el.id}
                link={
                  el.to === "/post"
                    ? el.to + `/${authUserActivePost!.id}`
                    : el.to === "/chat"
                    ? el.to + `/${user.id}`
                    : el.to
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
