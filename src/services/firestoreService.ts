import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { OperationType, FirestoreErrorInfo, State, City, TouristPlace } from '../types';

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified || false,
      isAnonymous: auth.currentUser?.isAnonymous || false,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const firestoreService = {
  async getStates(): Promise<State[] | undefined> {
    const path = 'states';
    try {
      const snapshot = await getDocs(collection(db, path));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as State));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async getCities(stateId: string): Promise<City[] | undefined> {
    const path = 'cities';
    try {
      const q = query(collection(db, path), where('stateId', '==', stateId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as City));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async getPlaces(stateId?: string, cityId?: string, category?: string): Promise<TouristPlace[] | undefined> {
    const path = 'places';
    try {
      let q = query(collection(db, path));
      if (stateId) q = query(q, where('stateId', '==', stateId));
      if (cityId) q = query(q, where('cityId', '==', cityId));
      if (category) q = query(q, where('category', '==', category));
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TouristPlace));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async getPlace(placeId: string): Promise<TouristPlace | null | undefined> {
    const path = `places/${placeId}`;
    try {
      const docRef = doc(db, 'places', placeId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as TouristPlace;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  async getFeaturedPlaces(): Promise<TouristPlace[] | undefined> {
    const path = 'places';
    try {
      const q = query(collection(db, path), where('isFeatured', '==', true));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TouristPlace));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  subscribeToStates(callback: (states: State[]) => void) {
    const path = 'states';
    return onSnapshot(collection(db, path), (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as State)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  subscribeToPlaces(callback: (places: TouristPlace[]) => void, stateId?: string) {
    const path = 'places';
    let q = query(collection(db, path));
    if (stateId) q = query(q, where('stateId', '==', stateId));
    
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TouristPlace)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  async addPlace(place: Partial<TouristPlace>) {
    const path = 'places';
    try {
      return await addDoc(collection(db, path), place);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async updatePlace(placeId: string, place: Partial<TouristPlace>) {
    const path = `places/${placeId}`;
    try {
      const docRef = doc(db, 'places', placeId);
      return await updateDoc(docRef, place);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  async deletePlace(placeId: string) {
    const path = `places/${placeId}`;
    try {
      const docRef = doc(db, 'places', placeId);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }
};
