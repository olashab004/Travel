export interface State {
  id: string;
  name: string;
  code: string;
  description?: string;
  imageUrl?: string;
  capital?: string;
  region?: string;
  tagline?: string;
  language?: string;
}

export interface City {
  id: string;
  name: string;
  stateId: string;
  description?: string;
  imageUrl?: string;
}

export interface TouristPlace {
  id: string;
  name: string;
  stateId: string;
  cityId: string;
  category: 'Heritage' | 'Nature' | 'Religious' | 'Adventure' | 'Beach' | 'Wildlife';
  description: string;
  bestTimeToVisit?: string;
  entryFees?: string;
  timings?: string;
  locationUrl?: string;
  imageUrls?: string[];
  nearbyAttractions?: string[];
  tags?: string[];
  isFeatured?: boolean;
  rating?: number;
  reviewsCount?: number;
  rituals?: string[];
  festivals?: string[];
  dressCode?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'user';
  displayName?: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}
