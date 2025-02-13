import supabase from "../../database/supabase";
import { ISkin } from "../../models/ISkin";

export default class SkinsService {
  static async getAllSkins(): Promise<ISkin[]> {
    try {
      const { data: skins, error } = await supabase.from("skins").select();

      if (error) {
        console.warn("Error getting skins:", error);
        throw new Error("Failed to get skins.");
      }

      return skins;
    } catch (error) {
      console.warn("Failed to retrieve all skins:", error);
      throw error;
    }
  }

  static async addSkinForUser(userId: number, skinId: number): Promise<void> {
    try {
      const { error: userSkinError } = await supabase
        .from("users_skins")
        .insert([
          {
            user_id: userId,
            skin_id: skinId,
          },
        ]);

      if (userSkinError) {
        console.warn("Error associating skin with user:", userSkinError);
        throw new Error("Failed to associate new skin with user.");
      }
    } catch (error) {
      console.warn("Failed to add skin for user:", error);
      throw error;
    }
  }

  static async getAvailableSkinsByUserId(userId: number): Promise<ISkin[]> {
    try {
      const { data, error } = await supabase
        .from("users_skins")
        .select("skin_id, skins(*)")
        .eq("user_id", userId);

      if (error) {
        console.warn("Error fetching skins:", error);
        throw new Error("Failed to fetch available skins.");
      }

      const skins = data.map((item) => item.skins).filter(Boolean);

      // @ts-ignore
      return skins;
    } catch (error) {
      console.warn("Failed to retrieve available skins:", error);
      throw error;
    }
  }
}
