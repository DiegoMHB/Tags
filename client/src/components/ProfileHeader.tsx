import stampToDate from "../assets/helperFunctions/stampToDate";
import { postStore } from "../zustand/postStore";
import { userStore } from "../zustand/userStore";

export default function ProfileHeader() {
  const { user, } = userStore();
  const {  activePost, userPostsList } = postStore();

  return (
    <section
      className="flex flex-col justify-between h-[100px] w-full p-2 rounded-2xl
    bg-gradient-to-t from-[#FFFFFF]/30 to-[#FFFFFF]/40"
    >
      <div className="flex gap-5 ">
        <img
          className="w-20 h-20 object-cover m-1 mr-0 rounded-[100%]"
          src={user.profilePicture!}
          alt={"photo"}
        />

        <div className=" flex flex-col w-full h-20">
          <div className="flex flex-row items-center gap-3">
            <div
              className={`${
                activePost ? "bg-green-500" : "bg-amber-300"
              } w-3 h-3 rounded-xl`}
            ></div>
            <h3 className="text-xl">{user.userName}</h3>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">Member since:</p>
            <p className="text-xs">
              {user && stampToDate(user.createdAt as string)}
            </p>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">Posts:</p>
            <p className="text-xs">{userPostsList.length}</p>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">City:</p>
            <p className="text-xs">{user.city}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
