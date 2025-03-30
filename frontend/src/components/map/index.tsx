import './index.scss';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import custom icon images
import customIconUrl from '../../assets/markerIcon.png';

// Define custom icon
const customIcon = new L.Icon({
    iconUrl: customIconUrl,
    iconSize: [30, 30], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
});

// This component handles clicks on the map.
interface LocationSelectorProps {
    setLocationName: (name: string) => void;
    setNewLocationNameSelector: (name: string) => void;
    setLocationX: (cord: number) => void;
    setLocationY: (name: number) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ setLocationName, setLocationX, setLocationY, setNewLocationNameSelector }) => {
    const [selectedPosition, setSelectedPosition] = useState<L.LatLng | null>(null);

    useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;
            // Reverse geocode to get the location name using Nominatim.
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                );
                const data = await response.json();
                const name = data.display_name || 'Unknown location';
                setSelectedPosition(e.latlng);
                setLocationX(lat);
                setLocationY(lng);
                setLocationName(name);
                setNewLocationNameSelector(name);
            } catch (error) {
                console.error('Reverse geocoding error:', error);
            }
        },
    });

    return selectedPosition ? (
        <Marker position={selectedPosition} icon={customIcon}>
        </Marker>
    ) : null;
};

interface MapComponentProps {
    savedLocations: { position: [number, number] }[];
    locationNameChange: (name: string) => void;
    setLocationX: (cord: number) => void;
    setLocationY: (name: number) => void;
    edit: boolean;
    large: boolean;
    wholeMapZoom?: boolean;
    defultLocation?: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({ locationNameChange, setLocationX, setLocationY, savedLocations, edit, large, wholeMapZoom, defultLocation = [32.081313267035924, 34.779796586846956] }) => {
    const [newlocationName, setNewLocationName] = useState('');

    return (
        <MapContainer
            center={defultLocation}
            zoom={wholeMapZoom ? 3 : 13}
            style={{ width: '100%', height: large ? '100%' : '300px', zIndex: 1 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {edit &&
                <LocationSelector
                    setLocationName={locationNameChange}
                    setNewLocationNameSelector={setNewLocationName}
                    setLocationX={setLocationX}
                    setLocationY={setLocationY}
                />
            }

            {savedLocations && newlocationName === '' &&
                savedLocations.map((loc, index) => (
                    <Marker key={index} position={loc.position} icon={customIcon}>
                    </Marker>
                ))
            }
        </MapContainer>
    );
};

export default MapComponent;
