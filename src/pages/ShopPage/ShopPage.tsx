import { useTg } from "../../hooks/useTg";
import SkinsList from "../../components/SkinsList/SkinsList";

import "./ShopPage.scss";
import { useEffect } from "react";

const ShopPage = () => {
  const { backBtn } = useTg();

  useEffect(() => {
    backBtn.show();
  }, []);

  return (
    <section className="shop-page">
      <div className="container shop-page__container">
        <h3 className="shop-page__title">Choose your hero</h3>
        <SkinsList />
      </div>
    </section>
  );
};

export default ShopPage;
