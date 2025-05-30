import { useEffect } from "react";
import BtnMain from "../components/buttons/BtnMain";
import { appStore } from "../zustand/appStore";
import { mapStore } from "../zustand/mapStore";
import { userStore } from "../zustand/userStore";

export default function Landing() {
  const { logInAuto, loggedOut } = userStore();
  const { allActivePosts, setMapRender, getAllPosts } = appStore();
  const { getCoords } = mapStore();

  useEffect(() => {
    getCoords();
    if (allActivePosts?.length == 0) {
      getAllPosts();
    }
  }, []);
  
  useEffect(() => {
    if (!loggedOut) {
      logInAuto();
    }
  }, [loggedOut]);

  return (
    <div className="flex flex-col justify-center items-center w-screen space-y-4">
      <BtnMain
        text={"Check Around"}
        mode={1}
        link="/map"
        onClick={setMapRender}
        disabled={false}
      ></BtnMain>

      <BtnMain
        text={"Log In"}
        mode={0}
        link="/login"
        disabled={false}
      ></BtnMain>

      <BtnMain
        text={"Sign In"}
        mode={0}
        link="/signin"
        disabled={false}
      ></BtnMain>
    </div>
  );
}
