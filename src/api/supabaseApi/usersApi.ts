import supabase from "../../database/supabase";
import { IUser } from "../../models/IUser";
import SkinsService from "./skinsApi";

export default class UserService {
  static async getByTgId(tg_id: number) {
    try {
      const { data: user, error } = await supabase
        .from("users")
        .select()
        .eq("tg_id", tg_id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.warn("Error getting user:", error);
        throw new Error("Failed to get user.");
      }

      return user;
    } catch (error) {
      console.warn("Failed to retrieve user by tg_id:", error);
      throw error;
    }
  }

  static async getUsersByRecord(limit: number = 10) {
    try {
      const { data: users, error } = await supabase
        .from("users")
        .select()
        .order("record", { ascending: false })
        .limit(limit);

      if (error) {
        console.warn("Error getting users:", error);
        throw new Error("Failed to get users.");
      }

      return users;
    } catch (error) {
      console.warn("Failed to retrieve all users:", error);
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const { data: users, error } = await supabase.from("users").select();

      if (error) {
        console.warn("Error getting users:", error);
        throw new Error("Failed to get users.");
      }

      return users;
    } catch (error) {
      console.warn("Failed to retrieve all users:", error);
      throw error;
    }
  }

  static async getById(id: number) {
    try {
      const { data: user, error } = await supabase
        .from("users")
        .select()
        .eq("id", id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.warn("Error getting user:", error);
        throw new Error("Failed to get user.");
      }

      return user;
    } catch (error) {
      console.warn("Failed to retrieve user by id:", error);
      throw error;
    }
  }

  static async insertNewUser(tg_id: number) {
    try {
      const newUser: IUser = {
        tg_id: tg_id,
        money: 0,
        record: 0,
      };

      const { data: insertedUser, error: userError } = await supabase
        .from("users")
        .insert([newUser])
        .select("*")
        .single();

      if (userError) {
        console.warn("Insert User Error:", userError);
        throw new Error("Failed to insert user.");
      }

      await SkinsService.addSkinForUser(insertedUser.id, 1);

      return insertedUser;
    } catch (error) {
      console.warn("Failed to insert new user:", error);
      throw error;
    }
  }

  static async logIn(tg_id: number) {
    try {
      let user = await this.getByTgId(tg_id);

      if (!user) {
        const newUser: IUser = {
          tg_id: tg_id,
          money: 0,
          record: 0,
        };
        user = await this.insertNewUser(newUser.tg_id);
      }
      return user;
    } catch (error) {
      console.warn("Error in logIn:", error);
      throw new Error("An error occurred during the operation.");
    }
  }

  static async updateUserRecord(id: number, newRecord: number) {
    try {
      const { data: updatedUser, error } = await supabase
        .from("users")
        .update({ record: newRecord })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.warn("Error updating user record:", error);
        throw new Error("Failed to update user record.");
      }

      return updatedUser;
    } catch (error) {
      console.warn("Failed to update user record:", error);
      throw error;
    }
  }
}
