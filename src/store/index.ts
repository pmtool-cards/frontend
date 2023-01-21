import create from "zustand";
import { User } from "../api/auth";

type Store = {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
}));

export default useStore;
