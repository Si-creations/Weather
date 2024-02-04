import React, { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  useEffect(() => {
    const onSuccess = (location) => {
      const { latitude, longitude } = location.coords;

      localStorage.setItem("lat", latitude);
      localStorage.setItem("lng", longitude);

      setLocation({
        loaded: true,
        coordinates: { lat: latitude, lng: longitude },
      });
    };

    const onError = (error) => {
      setLocation({
        loaded: true,
        error,
      });
    };

    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
};

export default useGeolocation;
