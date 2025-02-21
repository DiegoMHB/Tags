import { divIcon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import PopUpPost from "./PopUpPost";
import { appStore } from "../zustand/appStore";
import { PostType } from "../types/postTypes";

type postMarkerProps = {
  post: PostType;
};

export default function PostMarker({ post }: postMarkerProps) {
  const { getUserFromPost } = appStore();

  return (
    <Marker
      eventHandlers={{ click: () => getUserFromPost(post.userId) }}
      position={post.coordinates}
      key={post.id}
      icon={divIcon({
        className: "marker_icon",
        html: `<div class="marker_container">
                    <div  class="post_marker_LED"></div>
                 <h2 class="my_post_marker"> ${"# " + post.title} </h2>
                 </div>`,
      })}
    >
      <Popup>
        <PopUpPost post={post}></PopUpPost>
      </Popup>
    </Marker>
  );
}
