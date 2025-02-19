import { useEffect } from "react";
import { userStore } from "../zustand/userStore";

export default function PostComponent() {
  const { activePost } = userStore();


  useEffect(() => {  }, []);

  return (
    <section className="flex flex-col justify-between h-full w-full">
   
   {activePost?.picture &&
          <img className="w-20 h-20 object-cover"
            src={activePost?.picture? activePost.picture : ""}
            alt={"photo"}
          />}
        
        <div className=" flex flex-col w-full h-20">
          <div className="flex flex-row items-center gap-3">
        
            <h3 className="text-xl">{activePost?.title}</h3>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">Category:</p>
            <p className="text-xs">{activePost!.category}</p>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">Description:</p>
            <p className="text-xs">{activePost!.description}</p>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">duration:</p>
            <p className="text-xs">{activePost?.duration}</p>
          </div>
       
      </div>

      
    </section>
  );
}
