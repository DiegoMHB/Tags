import { MapContainer, TileLayer,Marker, Popup } from "react-leaflet";
import { mapUtilities } from "../data/mapUtilities";
import "leaflet/dist/leaflet.css";
import { mapStore } from "../zustand/mapStore";
import { LatLngTuple } from "leaflet";
import { useEffect } from "react";

export default function Map() {

    const {coordinates , getCoords } = mapStore(); 

    useEffect(()=> getCoords(),[])

  return (
    <>
        <section className="w-screen h-[100%]">
          <MapContainer center={coordinates as LatLngTuple} zoom={15} id="map">
            <TileLayer
              url={mapUtilities.url}
              attribution={mapUtilities.attribution}
              id="map"
            />

            <Marker position={[51.505, -0.09,]}>
              <Popup>
                A pretty CSS3 popup. <br />
              </Popup>
            </Marker>
          </MapContainer>
        </section>
    </>
  );
}
