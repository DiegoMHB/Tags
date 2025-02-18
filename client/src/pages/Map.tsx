import { MapContainer, TileLayer,Marker, Popup } from "react-leaflet";
import { mapUtilities } from "../data/mapUtilities";
import "leaflet/dist/leaflet.css";
import { mapStore } from "../zustand/mapStore";
import { divIcon, LatLngTuple } from "leaflet";
import { appStore } from "../zustand/appStore";

export default function Map() {

    const {coordinates } = mapStore(); 
    const {posts } = appStore(); 


  return (
    <>
        <section className="w-screen h-[100%]">
          <MapContainer center={coordinates as LatLngTuple} zoom={15} id="map">
            <TileLayer
              url={mapUtilities.url}
              attribution={mapUtilities.attribution}
              id="map"
            />

            <Marker position={ coordinates as LatLngTuple}>
                
              <Popup>
                You are here
              </Popup>
            </Marker>

            {posts.map( post => (
                
                <Marker position={post.coordinates} key={post.id} 
                icon={divIcon({
                    className: "marker_icon",
                    html: `<div>
                <h2 class='marker_tag'>#${post.title} </h2>
                
              </div>`,
                  })}
                >
                
              <Popup>
               
              </Popup>
            </Marker>

            ))
            
            }
          </MapContainer>
        </section>
    </>
  );
}
