import { useEffect, useState } from "react";
import stampToDate from "../assets/helperFunctions/stampToDate";
import { userStore } from "../zustand/userStore";

export default function ProfileHeader() {
  const { user } = userStore();
  const { auth } = userStore();
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (user.createdAt) {
      const formattedDate = stampToDate(user.createdAt);
      setDate(formattedDate);
    }
  }, [user, date,auth]);

  return (
    <section className="flex flex-col justify-between h-full w-full">
      <div className="flex m-5 gap-5 ">
        
          <img className="w-20 h-20 object-cover"
            src={user.profilePicture!}
            alt={"https://via.placeholder.com/150"}
          />
        
        <div className=" flex flex-col w-full h-20">
          <div className="flex flex-row items-center gap-3">
            <div
              className={`${
                auth ? "bg-green-500" : "bg-red-600"
              }0 w-3 h-3 rounded-xl`}
            ></div>
            <h3 className="text-xl">{user.userName}</h3>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">Member since:</p>
            <p className="text-xs">{date}</p>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">Posts:</p>
            <p className="text-xs">0</p>
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
