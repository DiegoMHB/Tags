import Landing from "../pages/Landing";
import Map from "../pages/Map";
import NavBarElement from "../components/buttons/NavBarElement";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { links } from "../data/listUtilities";
import chat from "../assets/images/chat.svg";
import userIcon from "../assets/images/user.svg";
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

  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen max-w-[400px] m-auto ">
        {auth && (
          <section className="flex flex-row justify-between bg-[#c8eef9] h-14 w-full p-3">
            <div
              className=" flex flex-col justify-center h-[35px] w-[35px] rounded-full bg-white p-1 "
              onClick={() => navigate(`/profile`)}
            >
              <img
                src={userIcon}
                className="w-[22px] h-[22px] self-center"
              ></img>
            </div>

            <p className="text-2xl">this now!</p>

            <div
              className=" flex flex-col justify-center h-[35px] w-[35px] rounded-full bg-white p-1 "
              onClick={() => navigate(`/chat/${user.id}`)}
            >
              <img src={chat} className="w-[22px] h-[22px] self-center"></img>
            </div>
          </section>
        )}

        <section
          className="flex-1 flex align-middle justify-center 
        bg-gradient-to-b from-[#c6eef7] to-[#e0f5e6] 
        w-[100%]
        overflow-y-auto scrollbar-hidden "
        >
          {url === "/" && !mapRender ? (
            <Landing />
          ) : url === "/" && mapRender ? (
            <Map />
          ) : (
            <Outlet />
          )}
        </section>

        <section className="flex justify-evenly bg-[#c8eef9]  h-12  w-full  items-center max-w-[400px] ">
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
