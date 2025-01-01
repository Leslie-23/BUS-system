import React, { useState } from "react";
// import { DirectionsRenderer } from "@react-google-maps/api";
import {
  GoogleMap,
  useLoadScript,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "400px",
};
// using dotenv
// const libraries = ["places"];

// const options = {
//   disableDefaultUI: true,
//   zoomControl: true,
//   styles: mapStyles,
// };
// const center = {
//   lat: 0.1974,
//   lng: 5.5593, // Default to Accra, Ghana
// };
const center = {
  lat: 5.6037,
  lng: -0.187, // Default to Accra, Ghana
};

export const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBrTnWsYWRTO0u9fQI1gy3t9s5fJDCbhhg",
    libraries: ["places"], // Ensure you load the "places" library for Autocomplete
  });

  //   console.log(process.env.API_KEY);
  const [toStop, setToStop] = useState(null);
  const [fromStop, setFromStop] = useState(null);

  const [toInput, setToInput] = useState("");
  const [fromInput, setFromInput] = useState("");

  const onMapClick = (e) => {
    if (!fromStop) {
      setFromStop({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    } else {
      setToStop({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  const handleSelectPlace = (place, isTo) => {
    if (!place || !place.geometry) return;

    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    if (isTo) {
      setToStop(location);
      setToInput(place.formatted_address);
    } else {
      setFromStop(location);
      setFromInput(place.formatted_address);
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Autocomplete
          onPlaceChanged={(ref) => {
            const place = ref.getPlace();
            handleSelectPlace(place, false);
          }}
        >
          <input
            type="text"
            placeholder="Enter starting point"
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            style={{
              width: "300px",
              padding: "8px",
              marginRight: "10px",
            }}
          />
        </Autocomplete>

        <Autocomplete
          onPlaceChanged={(ref) => {
            const place = ref.getPlace();
            handleSelectPlace(place, true);
          }}
        >
          <input
            type="text"
            placeholder="Enter destination"
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
            style={{ width: "300px", padding: "8px" }}
          />
        </Autocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={onMapClick}
      >
        {fromStop && <Marker position={fromStop} label="From" />}
        {toStop && <Marker position={toStop} label="To" />}
      </GoogleMap>
    </div>
  );
};

// export MapComponent ;

const MapWithDirections = () => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  const handleDirectionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
      } else {
        console.error("Directions request failed due to: " + response.status);
        setError(response.status);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBrTnWsYWRTO0u9fQI1gy3t9s5fJDCbhhg">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Directions Service */}
        <DirectionsService
          options={{
            destination: "Tema, Ghana", // Replace with a dynamic value
            origin: "Accra, Ghana", // Replace with a dynamic value
            travelMode: "DRIVING",
          }}
          callback={handleDirectionsCallback}
        />
        {/* Directions Renderer */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      {/* {error && <p>Error: {error}</p>} */}
    </LoadScript>
  );
};

export default MapWithDirections;
