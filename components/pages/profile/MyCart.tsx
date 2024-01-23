import React, { useMemo, useState } from "react";
import { Button, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { setServicesCheckout } from "redux/service/slice";
import { selectMyCart } from "redux/service/selector";
import { useHomeHook } from "../home/hooks";
import { Form, Formik } from "formik";
import FormItem, { TYPE_INPUT } from "@components//FormItem";
import { cartListSchema } from "utils/schema";
import { useRouter } from "next/router";
import { APP_URL } from "constants/routes";
import TYPE_CONSTANTS from "constants/type";
import showMessage from "@components//Message";
import Link from "next/link";
import { limitQuantity } from "utils";
import { MAX_LENGTH_PRICE } from "../../../constants/index";

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const MyCart: React.FC = () => {
  const [checkedList, setCheckedList] = useState([]) as any;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const listCartData = useAppSelector(selectMyCart.getMyCart);
  const { removeCart, updateInfoCart } = useHomeHook();

  const router = useRouter();

  const checkAll = useMemo(() => {
    return listCartData?.length === checkedList.length;
  }, [listCartData, checkedList]);

  const indeterminate = useMemo(() => {
    return checkedList.length > 0 && checkedList.length < listCartData?.length;
  }, [listCartData, checkedList]);

  const onChangeGroup = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (setFieldValue: any) => (e: CheckboxChangeEvent) => {
    const listCartId = listCartData?.map((item: any) => item?.id);
    setCheckedList(e.target.checked ? listCartId : []);
    for (let i = 0; i < listCartData?.length; i++) {
      setTimeout(() => {
        setFieldValue(`carts.${i}.checked`, e.target.checked);
      }, 100);
    }
  };

  const getTotalPrice = (listCarts: any) => {
    const arrServiceSelect = listCarts?.filter((item: any, k: number) =>
      checkedList?.some((val: any) => val === item?.id)
    );
    return (
      arrServiceSelect
        ?.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0)
        .toFixed(2) || 0
    );
  };

  const onRemoveCart = (id: string, idCart: string) => {
    const newCheckedList = checkedList?.filter((item: any) => item !== id);
    setCheckedList(newCheckedList);
    removeCart(idCart);
  };

  const renderCardService = (value: any, idx: any, setFieldValue: any) => {
    const { name, desc, quantity, price, id, idCart, link } = value || {};

    return (
      <div className="card-service">
        <div className="card-service__header">
          <div>
            <img
              src="/images/logo-x.png"
              alt="logo-x"
              className="card-service__logo"
            />
            <div className="card-service__name">{name}</div>
          </div>
          <img
            className="icon-delete"
            src="/svg/delete.svg"
            alt="delete"
            onClick={() => onRemoveCart(id, idCart)}
          />
        </div>
        <div className="card-service__desc">{desc}</div>
        <FormItem
          name={`carts[${idx}].link`}
          placeholder={t("home.linkProfile")}
          value={link}
          className="input-link"
          suffix={
            <Button
              className="button--primary"
              onClick={() =>
                link && updateInfoCart({ link, quantity: +quantity }, idCart)
              }
            >
              {t("home.save")}
            </Button>
          }
        />
        <div className="card-service__footer">
          <div className="card-service__price">$ {price}</div>
          <div className="card-service__icon">
            <div className="text-label">{t("home.quantity")}</div>
            <div className="change-quantity">
              <button
                disabled={quantity === 1}
                onClick={() =>
                  setFieldValue(`carts.${idx}.quantity`, Number(quantity) - 1)
                }
                type="button"
              >
                <img src="/svg/minus.svg" alt="minus" />
              </button>
              <div className="quantity">
                <FormItem
                  typeInput={TYPE_INPUT.NUMBER}
                  name={`carts.${idx}.quantity`}
                  className="quantity-input"
                  // onBlur={() =>
                  //   (!quantity || quantity == 0) &&
                  //   setFieldValue(`carts.${idx}.quantity`, 1)
                  // }
                  isAllowed={limitQuantity}
                />
              </div>
              <button
                disabled={String(quantity).length === MAX_LENGTH_PRICE}
                onClick={() =>
                  setFieldValue(`carts.${idx}.quantity`, Number(quantity) + 1)
                }
                type="button"
              >
                <img src="/svg/plus.svg" alt="plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const cartEmpty = () => {
    return (
      <div className="cart-empty">
        <img src="/images/no-cart.png" alt="no-cart" />
        <div>{t("home.noOrderCart")}</div>
        <Link href={APP_URL.SERVICE}>
          <Button>{t("home.goService")}</Button>
        </Link>
      </div>
    );
  };

  const onChecked = (idx: any, setFieldValue: any) => (data: any) => {
    setFieldValue(`carts.${idx}.checked`, data?.target?.checked);
  };

  const onBuy = (data: any) => {
    const listSelected = data?.carts
      ?.filter((item: any) => item?.checked)
      ?.map((item: any) => ({
        name: item?.name,
        link: item?.link,
        quantity: item?.quantity,
        price: item?.price,
        desc: item?.desc,
        id: item?.id,
        cartId: item?.idCart,
      }));

    if (listSelected?.length === 0)
      return showMessage(typeOfMessage.ERROR, t("home.notSelect"));
    dispatch(setServicesCheckout(listSelected));
    router.push(APP_URL.CHECKOUT);
  };

  console.log("listCartData", listCartData);

  return (
    <div className="my-cart">
      {listCartData?.length > 0 ? (
        <>
          <Formik
            initialValues={{ carts: listCartData }}
            onSubmit={onBuy}
            validationSchema={cartListSchema}
            enableReinitialize
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div>
                  <div className="check-all">
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChange(setFieldValue)}
                      checked={checkAll}
                    >
                      {t("home.selectAll")}
                    </Checkbox>
                  </div>
                  <Checkbox.Group
                    style={{ width: "100%" }}
                    onChange={onChangeGroup}
                    value={checkedList}
                  >
                    {listCartData?.map((el: any, idx: any) => (
                      <div className="my-cart__item" key={idx}>
                        <Checkbox
                          value={el?.id}
                          onChange={onChecked(idx, setFieldValue)}
                        />
                        {renderCardService(
                          values?.carts[idx],
                          idx,
                          setFieldValue
                        )}
                      </div>
                    ))}
                  </Checkbox.Group>
                </div>
                <div className="my-cart__footer">
                  <div>
                    <div>{t("home.total")}</div>
                    <div className="total-price">
                      $ {Number(getTotalPrice(values?.carts)).toLocaleString()}
                    </div>
                  </div>
                  <Button htmlType="submit" className="btn-buy">
                    {t("home.buy")}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        cartEmpty()
      )}
    </div>
  );
};

export default MyCart;
