import { React, useEffect, useState } from 'react';
import {
    Typography,
    Box,
    CircularProgress
} from '@mui/material';
import './map.css';

async function generateMap() {
    // Function to display map with user's current position
    const displayMap = ({ lat, lng }) => {
        const userLocation = { lat, lng };
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 14
        });
        return map;
    }

    // Function to display nearby locations
    const displayMarker = async ({ map, lat, lng }) => {
        const location = { lat, lng };

        const request = {
            location: location,
            radius: 5000,
            type: ['hospital']
        };

        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status, pagination) => {
            // console.log('Results: ', results);
            // console.log('Status', status);
            // console.log('Service', service);
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    const marker = new window.google.maps.Marker({
                        position: results[i].geometry.location,
                        map: map
                    });
                }
                // if (pagination && pagination.hasNextPage) {
                //     console.log('Request: ', request);
                //     console.log('Pagination: ', pagination);
                // }
            } else {
                console.log(`Error performing search for nearby places.`);
            }
        });
    }

    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const map = displayMap({ lat, lng });
        new window.google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: "Your Location",
            icon: {
                url: "https://img.icons8.com/ios-filled/50/000000/street-view.png",
                scaledSize: new window.google.maps.Size(40, 40), // Set the size of your custom marker icon
            },
            zIndex: window.google.maps.Marker.MAX_ZINDEX + 1
        });
        await displayMarker({ map, lat, lng });
        // await displayMarker({ map, lat: 25.121230, lng: 81.890039 }); //Coordinates of Prayagraj
    });
}



function Map() {
    const [isLoading, setIsLoading] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(false);
    useEffect(() => {
        (async () => {
            const result = await navigator.permissions.query({ name: 'geolocation' });
            setLocationEnabled(result.state === 'granted');
            setIsLoading(false);
            if (locationEnabled) {
                const googleMapScript = document.createElement('script');
                googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC95ItXxwCqbJYKXn2QzsS3dW92zijVF3c&libraries=places`;
                window.document.head.appendChild(googleMapScript);
                googleMapScript.addEventListener('load', generateMap);
                return () => {
                    window.document.head.removeChild(googleMapScript);
                }
            }
        })();
    });

    return (
        <div className='mapContainer'>
            {
                isLoading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    (locationEnabled ?
                        <>
                            <Typography className='mapCaption' variant='h4' gutterBottom>Nearby Health centres</Typography>
                            <div id="map" className="healthMap"></div>
                        </>
                        :
                        <>
                            <Box component="span" sx={{ p: 2 }}>
                                <Typography variant='h5' gutterBottom>Please enable your location to view Nearby Locations.</Typography>
                            </Box>
                        </>)
            }
        </div>
    );
}

export default Map;