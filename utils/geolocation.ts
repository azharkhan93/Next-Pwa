export type Coordinates = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

export const getCurrentCoordinates = async (
  options?: PositionOptions
): Promise<Coordinates> => {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    throw new Error("Geolocation is not available in this environment");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      (err) => reject(err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        ...options,
      }
    );
  });
};

export type ReverseGeocodeResult = {
  city?: string;
  state?: string;
  district?: string;
  postcode?: string;
  displayName?: string;
};

// Uses OpenStreetMap Nominatim (public) for reverse geocoding
export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<ReverseGeocodeResult> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
    latitude
  )}&lon=${encodeURIComponent(longitude)}&zoom=10&addressdetails=1`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      // Be polite to the service; identify the app
      "User-Agent": "next-pwa-app/1.0 (reverse-geocode)",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to reverse geocode");
  }

  type NominatimAddress = {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    county?: string;
    state_district?: string;
    suburb?: string;
    postcode?: string;
  };
  type NominatimResponse = {
    address?: NominatimAddress;
    display_name?: string;
  };

  const data: NominatimResponse = await res.json();
  const addr: NominatimAddress = data?.address ?? {};
  return {
    city: addr.city || addr.town || addr.village,
    state: addr.state,
    district: addr.county || addr.state_district || addr.suburb,
    postcode: addr.postcode,
    displayName: data?.display_name,
  };
};
