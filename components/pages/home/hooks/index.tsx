import showMessage from "@components//Message";
import { SORT_TYPE, TYPE_TAB_SERVICE } from "../../../../constants/index";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import listServices from "services/service";
import { DataService } from "types";
import TYPE_CONSTANTS from "constants/type";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { setCategories, setMyCart, setNotiList } from "redux/service/slice";
import { handleSetUser } from "redux/authentication/slice";
import { selectMyCart } from "redux/service/selector";

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const useHomeHook = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const listCartData = useAppSelector(selectMyCart.getMyCart);

  const [params, setParams] = useState({
    type: TYPE_TAB_SERVICE.ALL,
    search: "",
    page: 1,
    limit: 50,
    sortType: SORT_TYPE.ASC,
  });

  const [listServicesData, setListServicesData] = useState({
    listTrending: [],
    services: [],
  });

  const getListService = async () => {
    const data: DataService | any = await listServices.getListServiceTrending();
    if (data) {
      setListServicesData((prev) => ({ ...prev, listTrending: data }));
    }
  };

  const getListServiceAll = async (params: any) => {
    const isFavourite = params?.type === TYPE_TAB_SERVICE.FAVOURITE;
    const data: DataService | any = await (isFavourite
      ? listServices.getListServiceFavourite(params)
      : listServices.getListServiceAll(params));
    if (data) {
      const favouriteData =
        data?.items?.map((val: any) => ({ ...val?.service })) || [];
      setListServicesData((prev: any) => ({
        ...prev,
        services: isFavourite ? favouriteData : data?.items || [],
      }));
    }
  };

  const addToFavourite = async (
    id: any,
    isFavourite: boolean,
    onCallback?: () => void
  ) => {
    const data: DataService | any = await (isFavourite
      ? listServices.removeFavourite(id)
      : listServices.addToFavourite({ serviceId: id }));
    if (data) {
      onCallback && onCallback();
    }
  };

  const getAllCart = async () => {
    const data: DataService | any = await listServices.getAllCart(params);
    if (data) {
      const customData = data?.items?.map((item: any) => ({
        name: item?.service?.title,
        desc: item?.service?.desc,
        price: item?.service?.price,
        quantity: item?.quantity,
        id: item?.service?.id,
        idCart: item?.id,
        link: item?.link || "",
        checked: false,
        minQuantity: item?.service?.minQuantity,
        maxQuantity: item?.service?.maxQuantity,
      }));
      dispatch(setMyCart(customData));
    }
  };

  const getAllNoti = async (customParams?: any) => {
    const data: any = await listServices.getAllNoti({
      ...params,
      sortType: SORT_TYPE.DESC,
      ...customParams,
    });
    if (data) {
      const { items, numberNotiNotSeen } = data || {};
      dispatch(setNotiList({ items, numberNotiNotSeen } as any));
    }
  };

  const addToCart = async (id: any, customData?: any, isShowMessage = true) => {
    const data: DataService | any = await listServices.addToCart({
      serviceId: id,
      ...customData,
    });
    if (data) {
      isShowMessage &&
        showMessage(typeOfMessage.SUCCESS, "Add to cart successfully!");
      getAllCart();
    }
  };

  const removeCart = async (id: any) => {
    const data: DataService | any = await listServices.removeCart(id);
    if (data) {
      showMessage(typeOfMessage.SUCCESS, "Remove cart successfully!");
      getAllCart();
    }
  };

  const getUserInfo = async () => {
    const data: DataService | any = await listServices.getInfoUser();
    if (data) {
      dispatch(handleSetUser(data));
    }
  };

  const getCategotirsSerive = async () => {
    const data: DataService | any = await listServices.getCategoriesService();
    if (data) {
      dispatch(setCategories(data));
    }
  };

  const updateInfoCart = async (params: any, id: any) => {
    const data: DataService | any = await listServices.updateInfoCart(
      params,
      id
    );

    const newCarts = listCartData?.map((item: any) => {
      if (item?.idCart === id) {
        return {
          ...item,
          link: params?.link,
          quantity: params?.quantity,
        };
      }
      return item;
    });

    dispatch(setMyCart(newCarts));
    if (data) {
      showMessage(typeOfMessage.SUCCESS, "Save link successfully!");
    }
  };

  return {
    setParams,
    getListService,
    getListServiceAll,
    addToFavourite,
    addToCart,
    getAllCart,
    removeCart,
    updateInfoCart,
    getAllNoti,
    getUserInfo,
    getCategotirsSerive,
    listServicesData,
    params,
  };
};

export { useHomeHook };
