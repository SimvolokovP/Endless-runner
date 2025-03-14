import { FC } from "react";
import { ISkin } from "../../models/ISkin";
import { PiGreaterThanBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa";

import "./SkinItem.scss";
import useSkinStore from "../../store/useSkinStore";
import { IUser } from "../../models/IUser";
import SkinsService from "../../api/supabaseApi/skinsApi";
import { useTg } from "../../hooks/useTg";
import { PaymentService } from "../../api/telegramApi/paymentApi";

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
  const { hapticFeedback, invoice, tg, showMessage } = useTg();

  const buySkin = async () => {
    if (currentUser?.id && skin.id) {
      if (currentUser.record >= skin.price) {
        try {
          await SkinsService.addSkinForUser(currentUser?.id, skin.id);
          showMessage("Success! Skin purchased successfully.");
          fetchAvailableSkins();
        } catch (error) {
          console.warn("Error buying skin: ", error);
          showMessage("Error! Could not purchase skin.");
        }
      } else {
        showMessage("Insufficient funds to purchase this skin.");
      }
    }
  };

  const buySkinByStars = async () => {
    if (hapticFeedback) {
      hapticFeedback.impactOccurred("soft");
    }
    if (currentUser?.id && skin.id) {
      try {
        const resp = await PaymentService.skinPay({
          skinId: skin.id,
          userId: currentUser?.id,
          amount: skin.price,
        });
        await invoice(resp.invoice_link);

        tg.onEvent("invoiceClosed", async (inv) => {
          if (inv.status === "paid" && currentUser.id && skin.id) {
            await SkinsService.addSkinForUser(currentUser?.id, skin.id);
            showMessage("Success! Skin purchased successfully.");
            fetchAvailableSkins();
          }
        });
      } catch (error) {
        console.warn("Error processing payment: ", error);
        showMessage("Error! The server is currently down :)");
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
          <PiGreaterThanBold />
          {skin.price}
        </button>
      ) : (
        <button
          onClick={buySkinByStars}
          style={{
            backgroundColor: "#52cbff",
          }}
        >
          {skin.price}
          <FaStar />
        </button>
      )}
    </li>
  );
};

export default SkinItem;
