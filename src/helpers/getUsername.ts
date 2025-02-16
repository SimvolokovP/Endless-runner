import { User } from "@telegram-apps/types/dist/dts";

export const getUsername = (tgUser: User) => {
  if (tgUser) {
    return (
      tgUser?.username ||
      `${tgUser?.first_name || ""} ${tgUser?.last_name || ""}`.trim()
    );
  }
  return "Unknown";
};
