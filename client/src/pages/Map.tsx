import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { mapUtilities } from "../data/mapUtilities";
import "leaflet/dist/leaflet.css";
import { mapStore } from "../zustand/mapStore";
import { divIcon, LatLngTuple } from "leaflet";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";

export default function Map() {
  const { coordinates } = mapStore();
  const { posts } = appStore();
  const { activePost } = userStore();

  return (
    <>
      <section className="w-screen h-[100%]">
        <MapContainer center={coordinates as LatLngTuple} zoom={15} id="map">
          <TileLayer
            url={mapUtilities.url}
            attribution={mapUtilities.attribution}
            id="map"
          />
          {!activePost ? (
            <Marker position={coordinates as LatLngTuple}>
              <Popup>You are here</Popup>
            </Marker>
          ) : (
            <Marker
              position={activePost.coordinates}
              icon={divIcon({
                className: "marker_icon",
                html: `<div>  <h2 class='marker_tag'>#${activePost.title} </h2> </div>`
              })}
            ></Marker>
          )}

          {posts.map((post) => (
            <Marker
              position={post.coordinates}
              key={post.id}
              icon={divIcon({
                className: "marker_icon",
                html: `<div>
                <h2 class='marker_tag'>#${post.title} </h2>
                
              </div>`,
              })}
            >
              <Popup></Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
    </>
  );
}
