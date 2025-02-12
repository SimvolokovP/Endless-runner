import { create } from "zustand";
import { IUser } from "../models/IUser";
import UserService from "../api/supabaseApi/usersApi";

interface UserStore {
  currentUser: IUser | null;
  logIn: (tg_id: number) => Promise<void>;
  updateUserRecord: (newRecord: number) => Promise<void>;
}

const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  userStatus: {
    loading: false,
    error: null,
  },
  logIn: async (tg_id) => {
    try {
      const loggedInUser = await UserService.logIn(tg_id || 227072);
      set({ currentUser: loggedInUser });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
    }
  },
  updateUserRecord: async (newRecord) => {
    try {
      const currentUser = get().currentUser;

      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }

      const userId = currentUser.id;
      if (userId) {
        const updatedUser = await UserService.updateUserRecord(
          userId,
          newRecord
        );
        set({ currentUser: updatedUser });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
    }
  },
}));

export default useUserStore;
