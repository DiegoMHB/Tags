
import { useState } from "react";
import { PostType } from "../types/postTypes";

type PostComponentProps = {
  activePost: PostType;
};
export default function PostComponent({ activePost }: PostComponentProps) {

    const [imageLoaded, setImageLoaded] = useState(false);

  return (
        <section className=" flex flex-col gap-5 w-[80%] justify-center align-middle mx-auto py-5">
          <div>
            <div className="flex flex-row items-center gap-3">
              <h3 className="text-xl font-bold">#{activePost?.title}</h3>
            </div>
            <div className="flex justify-between items-baseline ">
              <p className="text-xs">Category:</p>
              <p className="text-xs">{activePost!.category}</p>
            </div>
            <div className="flex justify-between items-baseline ">
              <p className="text-xs">Duration:</p>
              <p className="text-xs">{activePost?.duration}</p>
            </div>
            <div className="flex flex-col justify-between items-baseline ">
              <p className="text-xs">Description:</p>
              <p className="text-xs">{activePost!.description}</p>
            </div>
          </div>
          <div className="relative w-full">
          {!imageLoaded && (
            <div className="w-full h-48 bg-indigo-200 animate-pulse"></div>
          )}
          {activePost.picture && (
            <img
              className={`w-full object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={activePost.picture}
              alt="photo"
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </div>
        </section>
  );
}
