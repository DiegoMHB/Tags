import ProfileHeader from "../components/ProfileHeader";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";

export default function Profile() {
  const { signIn } = userStore();
  const { setAuth } = appStore();

  return (
    <div className="flex flex-col  items-center w-screen space-y-4 ">
      <ProfileHeader />
    </div>
  );
}
