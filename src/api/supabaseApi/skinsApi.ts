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
}
