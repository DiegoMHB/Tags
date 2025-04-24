import { LatLngTuple } from "leaflet";
import { Marker } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

type LocationMarkerProps = {
  location: LatLngTuple;
};

export default function LocationMarker({ location }: LocationMarkerProps) {
  const htmlString = ReactDOMServer.renderToString(
    <div className="relative flex items-center justify-center">
      <div className="w-4 h-4 bg-red-600 rounded-full shadow-lg border-2 border-white z-10" />
      <div className="absolute w-5 h-5 rounded-full bg-red-400 opacity-30 animate-ping z-0" />
    </div>
  );

  const customIcon = L.divIcon({
    html: htmlString,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  return <Marker position={location} icon={customIcon}></Marker>;
}
