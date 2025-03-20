import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { mapStore } from "../zustand/mapStore";
import { appStore } from "../zustand/appStore";
import { mapUtilities } from "../data/mapUtilities";
import PostMarker from "../components/PostMarker";
import { useEffect } from "react";

export default function Map() {
  const { coordinates, getCoords } = mapStore();
  const { allActivePosts, authUserActivePost , resetSelected} = appStore();

  const postFiltered = allActivePosts.filter(
    (p) => p.id !== authUserActivePost?.id
  );

  useEffect(() => {
    getCoords();
    resetSelected()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="w-screen h-[100%]">
        <MapContainer center={coordinates as LatLngTuple} zoom={15} id="map">
          <TileLayer
            url={mapUtilities.url}
            attribution={mapUtilities.attribution}
            id="map"
          />
          {!authUserActivePost ? (
            <Marker position={coordinates as LatLngTuple}></Marker>
          ) : (
            <PostMarker
              post={authUserActivePost}
              key={authUserActivePost.id}
              isUsers={true}
            />
          )}

          {postFiltered.map((post) => (
            <PostMarker post={post} key={post.id} isUsers={false} />
          ))}
        </MapContainer>
      </main>
    </>
  );
}
