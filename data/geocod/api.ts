import { env } from "@/env";

export const getCoords = async ({
  dzongkhag,
  city,
}: {
  dzongkhag: string;
  city: string;
}) => {
  const res = await fetch(
    `https://geocode.maps.co/search?q=${dzongkhag} ${city}&api_key=${env.GEOCOD_API_KEY}`,
  );
  const place = await res.json();
  if (place) {
    return place;
  }
  return null;
};
