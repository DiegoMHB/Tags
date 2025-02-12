import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";

export default function Profile() {

      const {signIn} = userStore();
      const {setAuth} = appStore();

  return (
    <div className="flex flex-col justify-center items-center w-screen space-y-4 ">
    <p className="text-5xl"> PROFILE </p>
  </div>
  )
}
