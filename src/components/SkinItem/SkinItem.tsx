import { FC } from "react";
import { ISkin } from "../../models/ISkin";

import "./SkinItem.scss";
import useSkinStore from "../../store/useSkinStore";
import { IUser } from "../../models/IUser";
import SkinsService from "../../api/supabaseApi/skinsApi";

interface SkinItemProps {
  skin: ISkin;
  isAvailable: boolean;
  currentUser: IUser | null;
  fetchAvailableSkins: () => Promise<void>;
}

const SkinItem: FC<SkinItemProps> = ({
  skin,
  isAvailable,
  currentUser,
  fetchAvailableSkins,
}) => {
  const { setSkin, currentSkin } = useSkinStore();

  const buySkin = async () => {
    if (currentUser?.id && skin.id) {
      if (currentUser.record >= skin.price) {
        await SkinsService.addSkinForUser(currentUser?.id, skin.id);
        console.log("buy");
        fetchAvailableSkins();
      } else {
        console.log("non price");
      }
    }
  };

  return (
    <li className="skin-item">
      <div>{skin.name}</div>
      {!isAvailable && <div className="skin-item__blocked">blocked</div>}
      <img
        src={`https://${
          import.meta.env.VITE_SUPABASE_ID
        }.supabase.co/storage/v1/object/public/skins/${skin.name.toLowerCase()}/runFrame1.png`}
        alt={skin.name}
      />
      {isAvailable ? (
        <button
          style={{
            backgroundColor: currentSkin === skin.name ? "#a6ff52" : "#ffdc52",
          }}
          onClick={() => setSkin(skin.name)}
        >
          {currentSkin === skin.name ? "SELECTED" : "SELECT"}
        </button>
      ) : skin.volute === "score" ? (
        <button
          onClick={buySkin}
          style={{
            backgroundColor: "#ff6952",
          }}
        >
          {`> ${skin.price}`}
        </button>
      ) : (
        <button
          style={{
            backgroundColor: "#52cbff",
          }}
        >
          {`${skin.price} ⭐`}
        </button>
      )}
    </li>
  );
};

export default SkinItem;
