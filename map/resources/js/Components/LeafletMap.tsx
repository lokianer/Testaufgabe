import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customCrs from "@/scripts/CustomCrs";
import { SateliteStyle, AtlasStyle, GridStyle } from "@/scripts/mapStyles";
import axios from "axios";

interface MapData {
    color: string;
    lat: number;
    lng: number;
}

const LeafletMap: React.FC = () => {
    useEffect(() => {
        let mymap = L.map("map", {
            crs: customCrs,
            minZoom: 1,
            maxZoom: 5,
            preferCanvas: true,
            layers: [SateliteStyle],
            center: [0, 0],
            zoom: 3,
        });

        const layersControl: L.Control.Layers = L.control
            .layers({
                Satelite: SateliteStyle,
                Atlas: AtlasStyle,
                Grid: GridStyle,
            })
            .addTo(mymap);

        let currentMarkers: L.Circle[] = [];
        let intervalId: NodeJS.Timeout;

        const generateMarkers = (mapData: MapData[]) => {
            currentMarkers.forEach((marker) => marker.removeFrom(mymap));
            currentMarkers = [];

            mapData.forEach((dataPoint) => {
                const { color, lat, lng } = dataPoint;

                const marker = L.circle([lat, lng], {
                    color,
                    fillColor: color,
                    fillOpacity: 0.5,
                    radius: 10,
                }).addTo(mymap);
                marker.bindTooltip(
                    `Latitude: ${lat.toFixed(2)}, Longitude: ${lng.toFixed(2)}`
                );

                currentMarkers.push(marker);
            });
        };

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/redis");
                const mapData = response.data.data;
                generateMarkers(mapData);
                console.log("Data fetched", mapData);
            } catch (error) {
                console.error("Error fetching map data:", error);
            }
        };

        fetchData();

        intervalId = setInterval(fetchData, 5000);

        return () => {
            clearInterval(intervalId);
            mymap.remove();
        };
    }, []);

    return (
        <div className="leafletmap-container">
            <div id="map" className="leafletmap" />
        </div>
    );
};

export default LeafletMap;
