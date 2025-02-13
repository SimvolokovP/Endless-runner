import { useEffect, useState } from "react";
import { ISkin } from "../../models/ISkin";
import SkinsService from "../../api/supabaseApi/skinsApi";
import SkinItem from "../SkinItem/SkinItem";
import { ClipLoader } from "react-spinners";

import "./SkinsList.scss";
import useUserStore from "../../store/useUserStore";

const SkinsList = () => {
  const [skins, setSkins] = useState<ISkin[]>([]);
  const [availableSkins, setAvailableSkins] = useState<ISkin[]>([]);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const fetchSkins = async () => {
      const allSkins = await SkinsService.getAllSkins();
      setSkins(allSkins);
    };

    fetchSkins();
    fetchAvailableSkins();
  }, [currentUser]);

  const fetchAvailableSkins = async () => {
    if (currentUser?.id) {
      const targetSkins = await SkinsService.getAvailableSkinsByUserId(
        currentUser?.id
      );
      setAvailableSkins(targetSkins);
      console.log(targetSkins);
    }
  };

  return (
    <>
      <ul className="skins-list list-reset">
        {skins.length > 0 ? (
          skins.map((skin) => {
            const isAvailable = availableSkins.some(
              (available) => available.id === skin.id
            );

            return (
              <SkinItem
                key={skin.id}
                skin={skin}
                isAvailable={isAvailable}
                currentUser={currentUser}
                fetchAvailableSkins={fetchAvailableSkins}
              />
            );
          })
        ) : (
          <ClipLoader color="#ffdc52" />
        )}
      </ul>
    </>
  );
};

export default SkinsList;
