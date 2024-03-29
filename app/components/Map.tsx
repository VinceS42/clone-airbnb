"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";

const ICON = icon({
    iconUrl:
        "https://emassi.fr/wp-content/uploads/2017/10/Map-Marker-PNG-File.png",
    iconSize: [50, 50],
});

export default function Map({ locationValue }: { locationValue: string }) {
    const { getCountryByValue } = useCountries();
    const latLang = getCountryByValue(locationValue)?.latLang;

    return (
        <MapContainer
            scrollWheelZoom={false}
            className="h-[50vh] rounded-lg relative z-0"
            center={latLang ?? [45.439695, 4.3871779]}
            zoom={8}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latLang ?? [45.439695, 4.3871779]} icon={ICON} />
        </MapContainer>
    );
}
