// utils/geocode.js

import axios from "axios";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYXVzdGluZmFyciIsImEiOiJjbG83eXluZXIwOTg2Mm1wMGVtcWV1YXRtIn0.2EjhkI8xF-MTJpRx2qqt0Q"; // Replace with your Mapbox access token

export async function geocodeAddress(address) {
  try {
    // Encode the address for use in a URL
    const encodedAddress = encodeURIComponent(address);

    // Construct the Mapbox Geocoding API URL
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

    // Make the HTTP request to Mapbox's API
    const response = await axios.get(apiUrl);

    // Ensure the response contains location data
    if (
      response.data &&
      response.data.features &&
      response.data.features.length > 0
    ) {
      const location = response.data.features[0].geometry.coordinates;
      return {
        longitude: location[0],
        latitude: location[1],
      };
    } else {
      console.error("No location data found for the given address:", address);
      return null;
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    return null;
  }
}
