import React, { memo, useCallback, useState } from "react"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { config } from "../config"

const containerStyle = {
  width: "400px",
  height: "400px",
}

const center = {
  lat: 13.7467785,
  lng: 100.534954,
}

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: config.google.key || "",
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={() => console.log("clicked")}
    ></GoogleMap>
  ) : null
}

export default memo(MyMap)
