import React, { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";

const LocationAutocomplete = ({ value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["(cities)"], // Only suggest cities
        componentRestrictions: { country: [] }, // e.g., { country: "us" } to restrict
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onChange(place.formatted_address || place.name);
    });
  }, []);

  return (
    <TextField
      label="Location"
      fullWidth
      margin="normal"
      defaultValue={value}
      inputRef={inputRef}
    />
  );
};

export default LocationAutocomplete;
