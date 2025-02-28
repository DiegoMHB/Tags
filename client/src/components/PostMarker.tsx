import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { appStore } from "../zustand/appStore";
import { PostType } from "../types/postTypes";
import PopUpPost from "./PopUpPost";
import calculateTimeLeft from "../assets/helperFunctions/calculateTimeLeft";
import CircularProgressbarComp from "./CircularProgressbar";
import { TimeLeft } from "../types/appTypes";

type postMarkerProps = {
  post: PostType;
};

export default function PostMarker({ post }: postMarkerProps) {
  const { getUserFromPost } = appStore();
  const [visible, setVisible] = useState<boolean>(true);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(post.destroyAt, post.createdAt)
  );

  //CustomMarker with the Progressbar inside
  const customIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <div className="flex flex-col justify-center items-center">
        <CircularProgressbarComp timeLeft={timeLeft} />
        <span className="uppercase font-bold text-[10px]">
          #{`${post.title}`}
        </span>
      </div>
    ),
    className: "",
    iconSize: [20,20],
    iconAnchor: [5, 5],
    
  });

  useEffect(() => {
    if (timeLeft.percentage <= 0) {
      setVisible(false);
    } else {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft(post.destroyAt, post.createdAt));
      }, 8000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  return (
    visible && (
      <Marker
        eventHandlers={{ click: () => getUserFromPost(post.userId) }}
        position={post.coordinates}
        icon={customIcon}
      >
        <Popup>
          <PopUpPost post={post} timeLeft={timeLeft}></PopUpPost>
        </Popup>
      </Marker>
    )
  );
}
