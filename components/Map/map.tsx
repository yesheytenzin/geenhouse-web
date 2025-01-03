"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import Icons from "../Icons";
import { format } from "date-fns";

const Icon = icon({
  iconUrl: "/images/marker.png",
  iconSize: [32, 32],
});

interface MapUserType {
  posLat: string;
  posLong: string;
  dzongkhag: string;
  gewog: string;
  registeredAt: Date;
}

const getUserWithCoordinates = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/map/finder`,
    {
      cache: "no-store",
      method: "GET",
    },
  );
  const result = await res.json();
  return result;
};

const Map = () => {
  const [coordinatesList, setCoordinatesList] = useState<MapUserType[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    getUserWithCoordinates().then((res) => {
      setCoordinatesList(res);
      setFetching(false);
    });
  }, []);

  return (
    <>
      {fetching ? (
        <div className="flex flex-col justify-center items-center  lg:h-[65vh]">
          <Icons.codeGenerationLoading width={72} height={72} />
          <h2 className="animate-pulse delay-1000 tracking-wide">
            Fetching users with available locations
          </h2>
        </div>
      ) : coordinatesList.length ? (
        <MapContainer
          center={[27.5142, 90.4336]}
          zoom={9}
          preferCanvas={true}
          style={{ width: "100%", height: "600px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinatesList.map((user, index) => (
            <Marker
              key={index}
              position={[parseFloat(user.posLat), parseFloat(user.posLong)]}
              icon={Icon}
            >
              <Popup>
                <div>
                  <p>Dzongkhag: {user.dzongkhag}</p>
                  <p>Gewog: {user.gewog}</p>
                  <p>
                    Registered At:{" "}
                    {format(
                      new Date(user.registeredAt.toString()),
                      "EEEE, do MMM yyyy hh:mm aa",
                    )}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Icons.mapPin color="#A5B5B5" />
          <p className="text-muted-foreground">No users with location found</p>
        </div>
      )}
    </>
  );
};

export default Map;
