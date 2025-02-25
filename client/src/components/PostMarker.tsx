import { divIcon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import PopUpPost from "./PopUpPost";
import { appStore } from "../zustand/appStore";
import { PostType } from "../types/postTypes";
import { useEffect, useState } from "react";
import calculateTimeLeft from "../assets/helperFunctions/calculateTimeLeft";

type postMarkerProps = {
  post: PostType;
};

export default function PostMarker({ post }: postMarkerProps) {
  const { getUserFromPost } = appStore();
  const [visible, setVisible] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(post.destroyAt));

  useEffect(() => {
    if(timeLeft <= 0) {
        setVisible(false)
    }
      const interval = setInterval(() => {
          setTimeLeft(calculateTimeLeft(post.destroyAt));
      }, 4000);
  
      return () => clearInterval(interval); 
  }, [post.destroyAt, timeLeft]);

  return (
    visible && (
     <Marker
      eventHandlers={{ click: () => getUserFromPost(post.userId) }}
      position={post.coordinates}
      key={post.id}
      icon={divIcon({
        className: "marker_icon",
        html: `<div class="marker_container">
                    <div  class="post_marker_LED"></div>
                 <h2 class="my_post_marker"> ${"# " + post.title + timeLeft} </h2>
                 </div>`,
      })}
    >
      <Popup>
        <PopUpPost post={post}></PopUpPost>
      </Popup>
    </Marker>)
  );
}
