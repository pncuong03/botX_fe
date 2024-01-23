export const APP_URL = {
  LOGIN: "/login",
  HOME: "/",
  SERVICE: "/service",
  PAYMENT: "/payment",
  AFFILICATE: "/affilicate",
  FAQ: "/faq",
  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",
  CHECKOUT: "/checkout",
  PAYMENTQR: "/paymentQR",
  DASHBOARD: "/dashboard",
  REGISTER: "/register",

  BUFF_VIEW : '/service/buff-view',
  BUFF_FOLLOW : '/service/buff-follow',
  BUFF_REPOST : '/service/buff-repost',
  BUFF_COMMENT : '/service/buff-comment',
  BUFF_LIKE : '/service/buff-like',
  BUFF_IMPRESSION : '/service/buff-impression',
  BUFF_BOOKMARKS : '/service/buff-bookmarks',
  BUFF_LISTENER : '/service/buff-listener',
  EARN_MONEY : '/service/buff-money',
};

export const getMenuItems = (categories:any)=>{
  const subMenuService = categories?.map((item:any)=>(
    {
      subName: item?.title,
      id : item?.id
    }
  )) || []

  return  [
    {
      name: "home.home",
      url: APP_URL.DASHBOARD,
      icon: "/svg/service.svg",
    },
    {
      name: "home.service",
      url: APP_URL.SERVICE,
      icon: "/svg/service.svg",
      subMenu : subMenuService
    },
    {
      name: "home.deposit",
      url: APP_URL.PAYMENT,
      icon: "/svg/payment.svg",
    },
    {
      name: "home.affiliate",
      url: APP_URL.AFFILICATE,
      icon: "/svg/payment.svg",
    },
    {
      name: "home.orderHistory",
      url: APP_URL.PROFILE,
      icon: "/svg/faq.svg",
    },
    {
      name: "home.faq",
      url: APP_URL.FAQ,
      icon: "/svg/faq.svg",
    },
    {
      name: "home.profile",
      url: APP_URL.PROFILE_EDIT,
      icon: "/svg/faq.svg",
    },
  ];
}
