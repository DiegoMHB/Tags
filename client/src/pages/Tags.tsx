import {  useState } from "react";
import { appStore } from "../zustand/appStore";
import { PostType } from "../types/postTypes";
import { mapStore } from "../zustand/mapStore";

export default function PostsListPage() {
  const { allActivePosts } = appStore();
  const{coordinates} = mapStore()
  const [sortBy, setSortBy] = useState<"category" | "distance" | null>(null);

 

  // Pitagoras for distance
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    return Math.sqrt((lat2 - lat1) ** 2 + (lon2 - lon1) ** 2);
  };

  // sorted by...
  const sortedPosts = [...allActivePosts!];
  if (sortBy === "category") {
    sortedPosts.sort((a, b) => a.category.localeCompare(b.category));
  } else if (sortBy === "distance" && coordinates) {
    sortedPosts.sort((a, b) => {
      const distA = getDistance(coordinates[0], coordinates[1], a.coordinates[0], a.coordinates[1]);
      const distB = getDistance(coordinates[0], coordinates[1], b.coordinates[0], b.coordinates[1]);
      return distA - distB;
    });
  }

  //making groups for category
  const groupedPosts = sortBy === "category"
    ? sortedPosts.reduce<Record<string, PostType[]>>((acc, post: PostType) => {
        if (!acc[post.category]) acc[post.category] = [];
        acc[post.category].push(post);
        return acc;
      }, {})
    : {};

  return (
    <div className="p-2 max-w-lg mx-auto w-full">
      <div className="flex flex-row justify-center items-baseline gap-2">
        <h1 className="text-xs">Sort by:</h1>
        <button
          onClick={() => setSortBy(sortBy === "category" ? null : "category")}
          className={`m-2 py-1 bg-black rounded-full w-[80px] text-xs ${sortBy === "category" ? "text-amber-300" : "text-white"}`}
        >
          Category
        </button>
        <button
          onClick={() => setSortBy(sortBy === "distance" ? null : "distance")}
          className={`m-2 py-1 bg-black rounded-full w-[80px] text-xs ${sortBy === "distance" ? "text-amber-300" : "text-white"}`}
        >
          Distance
        </button>
      </div>

      {sortBy === "category" ? (
        <div className="">
          {Object.entries(groupedPosts).map(([category, posts]) => (
            <div key={category} className="flex flex-col justify-start  m-4 ">
              <h2 className=" text-xl font-bold">{category}:</h2>
                <div className="flex flex-row justify-start">
                {posts.map((post) => (
                  <button key={post.id} className="my-2 p-2 rounded-full text-xs bg-gradient-to-t from-[#FFFFFF]/50 to-[#FFFFFF]/40">
                    #{post.title}
                  </button>
                ))}</div>
             
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1">
          {sortedPosts.map((post) => (
            <button
              key={post.id}
              className="my-2 p-2 rounded-full text-xs bg-gradient-to-t from-[#FFFFFF]/50 to-[#FFFFFF]/40"
            >
              #{post.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}