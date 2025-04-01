import { useState } from "react";
import { appStore } from "../zustand/appStore";
import { Link } from "react-router-dom";
import { PostType } from "../types/postTypes";

export default function PostsListPage() {
  const { allActivePosts } = appStore();
  const [sorted, setSorted] = useState(false);

  // Ordenar por categoría si está activado
  const sortedPosts = sorted
    ? [...allActivePosts!].sort((a, b) => a.category.localeCompare(b.category))
    : allActivePosts;

  // Agrupar por categoría si está ordenado
  const groupedPosts = sorted
    ? sortedPosts!.reduce((acc, post : PostType) => {
        if (!acc[post.category]) acc[post.category] = [];
        acc[post.category].push(post);
        return acc;
      }, {} )
    : {};

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Posts List</h1>
      <button
        onClick={() => setSorted(!sorted)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-full"
      >
        {sorted ? "Unsort" : "Sort by Category"}
      </button>
      
      {sorted ? (
        <div>
          {Object.entries(groupedPosts).map(([category, posts]) => (
            <div key={category} className="mb-4">
              <h2 className="text-lg font-semibold mb-2">{category}</h2>
              <ul className="space-y-2">
                {posts!.map((post) => (
                  <li key={post.id} className="px-4 py-1 border rounded-full bg-gray-100 text-center">
                    {post.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {sortedPosts!.map((post) => (
            <button
              key={post.id}
              className="px-3 py-1 border rounded-full bg-gray-200 text-sm"
            >
              {post.title}
            </button>
          ))}
        </div>
      )}
      
      <Link to="/map" className="block text-blue-500 mt-4 text-center">
        Back to Map
      </Link>
    </div>
  );
}
