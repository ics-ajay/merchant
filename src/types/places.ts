export type HotspotsResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: HotspotsResult;
};

export type HotspotsResult = {
  count: number;
  data: {
    places: PlaceHotspot[];
  };
};

export type IdName = {
  id: number;
  name: string;
};

export type PriceRange = {
  id: number;
  range: string;
};

export type OpeningHour = {
  // structure not shown in your data
  // adjust when you inspect actual values
  [key: string]: any;
};

export type PlaceHotspot = {
  id: number;
  hotspotType: "place";

  placeDetails: string;
  dealDescription: string | null;

  placeCategory: IdName | null;
  foodCategory: IdName | null;
  vibeType: IdName | null;
  neighborhood: IdName;

  placeOpeningHours: OpeningHour[];

  googleLatitude: number;
  googleLongitude: number;
  googleLocationName: string;

  priceRange: PriceRange | null;

  image: string | null;

  isActive: boolean;
  isDeal: boolean;

  clickedCount: number;
  sharedCount: number;
  createdAt: string;
};

type Category = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type CategoryResult<T> = {
  data: T[];
  count: number;
};

type CategoryResponse<T> = {
  statusCode: number;
  status: boolean;
  message: string;
  result: CategoryResult<T>;
};

export type FoodCategoryResponse = CategoryResponse<Category>;
export type PlaceCategoryResponse = CategoryResponse<Category>;

export type VibeType = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VibeTypeResult = {
  data: VibeType[];
  count: number;
};

export type VibeTypeResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: VibeTypeResult;
};
// Geo types
export type Point = {
  type: "Point";
  coordinates: [number, number];
};

export type Polygon = {
  type: "Polygon";
  coordinates: number[][][];
};

// Country
export type CountryRef = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// State
export type StateRef = {
  id: number;
  name: string;
  isActive: boolean;
  countryId: number;
  createdAt: string;
  updatedAt: string;
};

// City
export type CityRef = {
  id: number;
  name: string;
  isActive: boolean;
  stateId: number;
  countryId: number;
  createdAt: string;
  updatedAt: string;
};

// Neighborhood
export type Neighborhood = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  center: Point;
  location: Polygon;
  city: string;
  cityId: number;
  cityRef: CityRef;
  state: string;
  stateId: number;
  stateRef: StateRef;
  country: string;
  countryId: number;
  countryRef: CountryRef;
  dropInOutRecords: unknown[];
  dropInUserCount: number;
};

export type NeighborhoodResult = {
  data: Neighborhood[];
  count: number;
};

export type NeighborhoodResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: NeighborhoodResult;
};
// Single price range type
export type PriceRangeFromApi = {
  id: number;
  range: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Result wrapper
export type PriceRangeResult = {
  data: PriceRangeFromApi[];
  count: number;
};

// Full API response
export type PriceRangeResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: PriceRangeResult;
};
// Single user
export interface User {
  user_id: number;
  user_firstName: string;
  user_lastName: string;
  user_phoneNumber: string;
  u_dob: string; // ISO date string
  user_totalConnections: string;

  isActive: boolean;
  isDroppedIn: boolean;
  isMembersOnlyEnabled: boolean;
}
export interface UsersResult {
  count: number;
  data: User[];
}
export interface GetUsersResponse {
  statusCode: number;
  status: boolean;
  message: string;
  result: UsersResult;
}
interface Option {
  id: number;
  name: string;
}
export interface PlaceDrawerProps {
  open: boolean;
  onClose: () => void;
  placeCategories: Option[];
  foodCategories: Option[];
  neighbourhoods: Option[];
  vibeTypes: Option[];
  priceRange: {
    id: number;
    range: string;
  }[];
}
export type LocationStateType = {
  name: string;
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
} | null;
export interface HotspotDetailsResponse {
  statusCode: number;
  status: boolean;
  message: string;
  result: HotspotPlace;
}
export interface HotspotPlace {
  id: number;
  googleLatitude: number;
  googleLongitude: number;
  googleLocationName: string;
  googleAddress: string;
  googleContact: string | null;
  googleWebsite: string | null;
  googleRating: number | null;
  googleReviews: number | null;
  googleOpeningHours: any | null;
  googleTypes: string[] | null;
  googlePlaceId: string;
  image: string;
  hotspotType: "place"; // restrict type if always place
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  placeDetails: string;
  placeOpeningHours: PlaceOpeningHour[];

  isDeal: boolean;
  redeemCode: string | null;
  dealDescription: string | null;

  clickedCount: number;
  sharedCount: number;

  priceRange: any | null;
  vibeType: any | null;
  placeCategory: any | null;
  foodCategory: any | null;
}
export interface PlaceOpeningHour {
  day: string;
  enabled: boolean;
  open?: string;
  close?: string;
}
