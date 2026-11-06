'use client'

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SvgLocation from "../icons/Location";
import L from 'leaflet';



export default function Map() {

    const position: [number, number] = [35.7219, 51.3347];

    const customIcon = L.icon({
        iconUrl: "/leaflet/marker-icon.png",
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        shadowUrl: "/leaflet/marker-shadow.png",

        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    })

    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-42.5 rounded-lg overflow-hidden
                md:h-76.5
                lg:h-120.5 lg:rounded-3xl
            "
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon} >
                <Popup>
                    Our Location
                </Popup>
            </Marker>
        </MapContainer>
    )
};
