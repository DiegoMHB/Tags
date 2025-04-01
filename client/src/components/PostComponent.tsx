import { useEffect, useState } from "react";
import { PostType } from "../types/postTypes";
import { TimeLeft } from "../types/appTypes";
import calculateTimeLeft from "../assets/helperFunctions/calculateTimeLeft";
import { userStore } from "../zustand/userStore";
import stampToDate from "../assets/helperFunctions/dateFunctions";
import { useNavigate } from "react-router-dom";
import { appStore } from "../zustand/appStore";
import { postStore } from "../zustand/postStore";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { mapUtilities } from "../data/mapUtilities";
import { LatLngTuple } from "leaflet";

type PostComponentProps = {
  post: PostType;
};

export default function PostComponent({ post }: PostComponentProps) {
  const { selectedUser, setSelectedPost } = appStore();
  const { user } = userStore();
  const { getUserPosts } = postStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(post.destroyAt, post.createdAt)
  );

  const navigate = useNavigate();

  useEffect(() => {
    //green/red not changing when closing before expiration time
    if (post.isActive) {
      if (timeLeft.percentage <= 0) {
        getUserPosts();
      } else {
        const interval = setInterval(() => {
          if (post.isActive) {
            setTimeLeft(calculateTimeLeft(post.destroyAt, post.createdAt));
          }
        }, 15000);
        return () => clearInterval(interval);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  return (
    <section
      className="flex flex-col w-full p-2 mt-0 rounded-2xl relative"
    >
      <div className="w-13 h-13 rounded-full overflow-hidden flex items-center justify-center absolute right-[20px] top-[45px]">
        <img
          className={`w-full h-full transition-opacity duration-500 transform 
                ${imageLoaded ? "opacity-100 " : "opacity-0 "}
                ${post.picture ? "scale-200" : "scale-100"}`}
          src={
            post.picture ? post.picture : `/assets/images/${post.category}.svg`
          }
          alt="photo"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className=" flex flex-col w-full px-3">
        <div className="flex flex-row justify-between gap-3 border-b-1 ">
          <h3
            className="text-xl font-bold flex items-baseline gap-3 "
            onClick={() => {
              setSelectedPost(post.id);
              navigate(`/post/${post.id}`);
            }}
          >
            {post.title}
            <div
              className={`${
                post.isActive ? "bg-green-500" : "bg-red-600"
              } w-3 h-3 rounded-xl`}
            ></div>
          </h3>
        </div>

        <div className="flex justify-between items-baseline ">
          <p className="text-xs font-bold">Category:</p>
          <p className="text-xs mr-[90px]">{post!.category}</p>
        </div>
        {post.isActive && (
          <div className="flex justify-between items-baseline ">
            <p className="text-xs font-bold">Duration:</p>
            <p className="text-xs mr-[90px]">{timeLeft.minutes}'</p>
          </div>
        )}
        {!post.isActive && (
          <div className="flex justify-between items-baseline ">
            <p className="text-xs font-bold">Date:</p>
            <p className="text-xs mr-[90px]">
              {post && stampToDate(post.createdAt as string)}
            </p>
          </div>
        )}
        {post.userId == user.id ? null : (
          <div className="flex justify-between items-baseline ">
            <p className="text-xs font-bold">User:</p>
            <p className="text-xs mr-[90px]">{selectedUser!.userName}</p>
          </div>
        )}
        <div className="flex justify-between items-baseline ">
          <p className="text-xs font-bold">Chats:</p>
          <p className="text-xs mr-[90px]">2</p>
        </div>
        <div className="flex flex-col items-baseline">
          <p className="text-xs font-bold">Description:</p>
          <p className="text-[14px] ">{post.description}</p>
        </div>
        <div className="mt-5">
          <MapContainer
            center={post!.coordinates! as LatLngTuple}
            zoom={15}
            id="mapPost"
            zoomControl={false}
          >
            <TileLayer
              url={mapUtilities.url}
              attribution={mapUtilities.attribution}
              id="map"
            />
            <Marker position={post!.coordinates as LatLngTuple}></Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
