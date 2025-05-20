
import { create } from 'zustand';

// State types
interface States {
  product_sortType: string;
}

// Action types
interface Actions {
  change_product_sortType: (sortType: string) => void;
}

// useCounterStore
export const useProductsStore = create<States & Actions>((set) => ({
  // States
  product_sortType: '',
    
  // Actions
  change_product_sortType: (sortType) => set((state) => ({...state, product_sortType: sortType}))
  
}));