import { FC } from "react";
import { ISkin } from "../../models/ISkin";

import "./SkinItem.scss";
import useSkinStore from "../../store/useSkinStore";

interface SkinItemProps {
  skin: ISkin;
}

const SkinItem: FC<SkinItemProps> = ({ skin }) => {
  const { setSkin, currentSkin } = useSkinStore();

  return (
    <li className="skin-item">
      <div>{skin.name}</div>
      <img
        src={`./players/${skin.name.toLowerCase()}/runFrame1.png`}
        alt={skin.name}
      />
      <button
        style={{
          backgroundColor: currentSkin === skin.name ? "#a6ff52" : "#ffdc52",
        }}
        onClick={() => setSkin(skin.name)}
      >
        {currentSkin === skin.name ? "SELECTED" : "SELECT"}
      </button>
    </li>
  );
};

export default SkinItem;
