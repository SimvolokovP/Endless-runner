import { IconType } from "react-icons";
import { FaGamepad, FaTrophy } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

interface INavLink {
  to: string;
  text: string;
  icon: IconType;
}

export const navLinks: INavLink[] = [
  {
    to: "/",
    icon: FaGamepad,
    text: "game",
  },
  {
    to: "/store",
    icon: FaCartShopping,
    text: "store",
  },
  {
    to: "/leaders",
    icon: FaTrophy,
    text: "leaders",
  },
];
