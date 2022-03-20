import Map, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";

function ShowMap({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  //TIP: "forEach" dosent return the value where as the "MAP" does and "REDUCE" when accumulate down bunch of thing into one and then return it.

  //transform the search result into array of object which has only latitude and longitude which will be required for the geolib(geoCenter) lib.
  const coordinates = searchResults.map((result) => ({
    //this is how you return object directly from the map
    longitude: result.long,
    latitude: result.lat,
  }));

  //make me center around those points we have in latitude and longitude coordinates.
  const center = getCenter(coordinates);
  //console.log(center);
  //this center(OBJECT) -> returns the center point of coordinates passed and this center will be used by mapBox

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 8,
  });

  return (
    <Map
      mapStyle="mapbox://styles/aayush11/cl0y8jpqp00es14mdbbic1gp7" //style url
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {searchResults.map((result, index) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl font-semibold  animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {/** popup show onClick of markup */}

          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              closeOnMove={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </Map>
  );
}

export default ShowMap;
