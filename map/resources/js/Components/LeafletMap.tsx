import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customCrs from "@/scripts/CustomCrs";
import { SateliteStyle, AtlasStyle, GridStyle } from "@/scripts/mapStyles";

const LeafletMap = () => {
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

        const generateMarkers = () => {
            currentMarkers.forEach((marker) => marker.removeFrom(mymap));
            currentMarkers = [];

            for (let i = 1; i <= 300; i++) {
                const randomColor =
                    "#" + Math.floor(Math.random() * 16777215).toString(16);
                const randomLat = Math.random() * 180 - 90;
                const randomLng = Math.random() * 360 - 180;

                const adjustedLat = randomLat + (Math.random() - 0.3) * 10000;
                const adjustedLng = randomLng + (Math.random() - 0.5) * 5500;

                const latlng = L.latLng(adjustedLat, adjustedLng);
                const layerPoint = mymap.latLngToLayerPoint(latlng);
                const leafletLatLng = mymap.layerPointToLatLng(layerPoint);

                const marker = L.circle(
                    [leafletLatLng.lat, leafletLatLng.lng],
                    {
                        color: randomColor,
                        fillColor: randomColor,
                        fillOpacity: 0.5,
                        radius: 10,
                    }
                ).addTo(mymap);
                marker.bindTooltip(
                    `Latitude: ${leafletLatLng.lat.toFixed(
                        2
                    )}, Longitude: ${leafletLatLng.lng.toFixed(2)}`
                );

                currentMarkers.push(marker);
            }
        };

        generateMarkers();

        const intervalId = setInterval(() => {
            generateMarkers();
        }, 25000);

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
