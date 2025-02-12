import { FC } from "react";
import { ISkin } from "../../models/ISkin";

import './SkinItem.scss'

interface SkinItemProps {
  skin: ISkin;
}

const SkinItem: FC<SkinItemProps> = ({ skin }) => {
  return (
    <li className="skin-item">
      <div>{skin.name}</div>
      <img src={`./players/${skin.name.toLowerCase()}/runFrame1.png`} alt={skin.name} />
      <button>SELECT</button>
    </li>
  );
};

export default SkinItem;
