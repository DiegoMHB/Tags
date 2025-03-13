import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { mapStore } from "../zustand/mapStore";
import { userStore } from "../zustand/userStore";
import { appStore } from "../zustand/appStore";
import { mapUtilities } from "../data/mapUtilities";
import PostMarker from "../components/PostMarker";




export default function Map() {
  const { coordinates } = mapStore();
  const { posts } = appStore();
  const { activePost } = userStore();

  const postFiltered = posts.filter((p)=> p.id !== activePost?.id)



  return (
    <>
      <main className="w-screen h-[100%]">
        <MapContainer center={coordinates as LatLngTuple} zoom={15} id="map">
          <TileLayer
            url={mapUtilities.url}
            attribution={mapUtilities.attribution}
            id="map"
          />
          {!activePost?
            <Marker position={coordinates as LatLngTuple} ></Marker>
            :
            <PostMarker post={activePost} key={activePost.id} isUsers={true}/>
          }

          {postFiltered.map((post) => (
            <PostMarker post={post} key={post.id} isUsers={false}/>
          ))}

        </MapContainer>
      </main>
    </>
  );
}
