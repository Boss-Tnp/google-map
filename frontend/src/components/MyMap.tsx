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

const locations = [
  {
    lat: 13.7422785,
    lng: 100.532654,
  },
  {
    lat: 13.7467385,
    lng: 100.532654,
  },
  {
    lat: 13.7454385,
    lng: 100.512654,
  },
]

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: config.google.key || "",
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState(locations)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null)
  }, [])

  const addMarker = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkers([
        ...markers,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      ])
    }
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={addMarker}
    >
      {markers.map((marker) => (
        <Marker position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
    </GoogleMap>
  ) : null
}

export default memo(MyMap)
