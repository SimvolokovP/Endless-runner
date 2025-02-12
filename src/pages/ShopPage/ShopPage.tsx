import SkinsList from "../../components/SkinsList/SkinsList";

import './ShopPage.scss';

const ShopPage = () => {
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
