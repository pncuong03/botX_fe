import { Button } from "antd";
import { useTranslation } from "next-i18next";
import { DataService } from "types";
import FavouriteStatus from "../pages/home/FavouriteStatus";
import { useHomeHook } from "../pages/home/hooks";
import { shortText } from "utils";

type PropsCustom = {
  onBuy: (item: DataService) => void;
};
type Props = PropsCustom & DataService;

const CardService = ({
  onBuy,
  title,
  desc,
  price,
  id,
  isHot,
  favourite,
  typeService,
  minQuantity,
  maxQuantity,
}: Props) => {
  const { t } = useTranslation();
  const { addToCart } = useHomeHook();

  return (
    <div className="card-service">
      <div
        onClick={() =>
          onBuy({
            title,
            desc,
            price,
            id,
            isHot,
            favourite,
            typeService,
            minQuantity,
            maxQuantity,
          })
        }
      >
        <div className="card-service__header">
          <img
            src="/images/logo-x.png"
            alt="logo-x"
            className="card-service__logo"
          />
          <div className="card-service__name">{shortText(title || "")}</div>
        </div>
        <div className="card-service__desc">{desc}</div>
      </div>

      <div className="card-service__footer">
        <div className="card-service__price">$ {price}</div>
        <div className="card-service__icon">
          <Button
            className="btn-buy"
            onClick={() =>
              onBuy({
                title,
                desc,
                price,
                id,
                isHot,
                favourite,
                typeService,
                minQuantity,
                maxQuantity,
              })
            }
          >
            {t("home.buy")}
          </Button>
          <img
            src="/svg/shopping-cart.svg"
            alt="shopping"
            className="icon-shopping"
            onClick={() => addToCart(id)}
          />
          <FavouriteStatus id={id} status={favourite as boolean} />
        </div>
      </div>
    </div>
  );
};

export default CardService;
