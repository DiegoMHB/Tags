import BtnMain from "../components/buttons/BtnMain";
import ProfileHeader from "../components/ProfileHeader";
import { userStore } from "../zustand/userStore";

export default function Profile() {
  const { logOut } = userStore();

  return (
    <div className="flex flex-col  items-center w-screen space-y-4 ">
      <ProfileHeader />
      <div className=" w-full flex justify-center mb-5">
        <BtnMain
          mode={0}
          text={"Log Out"}
          onClick={() => logOut()}
          link="/"
          disabled={false}
        />
      </div>
    </div>
  );
}
