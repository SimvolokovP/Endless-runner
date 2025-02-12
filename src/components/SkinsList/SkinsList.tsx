import { useEffect, useState } from "react";
import { ISkin } from "../../models/ISkin";
import SkinsService from "../../api/supabaseApi/skinsApi";
import SkinItem from "../SkinItem/SkinItem";

import './SkinsList.scss'

const SkinsList = () => {
  const [skins, setSkins] = useState<ISkin[]>([]);

  useEffect(() => {
    const fetchSkins = async () => {
      const targetSkins = await SkinsService.getAllSkins();
      setSkins(targetSkins);
      console.log(skins);
    };

    fetchSkins();
  }, []);

  return (
    <ul className="skins-list list-reset">
      {skins ? (
        skins.map((skin) => <SkinItem skin={skin} key={skin.id} />)
      ) : (
        <></>
      )}
    </ul>
  );
};

export default SkinsList;
