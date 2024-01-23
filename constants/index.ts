export const TYPE_TAB_SERVICE = {
    ALL :'home.all',
    FAVOURITE : 'home.favourite'
}

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;

export const EXTERNAL_LINK_REGEX = /^(http|https):\/\//;

export const TRANSACTION_HASH_REGEX = /^0x[a-fA-F0-9]{64}$/;

export const LIST_FILE_IMG_SUPPORT = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
];
export const MAX_FILE_SIZE_PREVIEW = 2097152;
export const MAX_FILE_SIZE = 104857600; // byte

export const EVENT_SOCKET = {
  NEW_NOTI : 'newNoti'
}

export const LANGUAGES ={
  VIETNAMESE : 'vi',
  ENGLISH : 'en',
}

export const MAX_LENGTH_PRICE = 6

export const FORMAT_TIME = 'DD/MM/YYYY | HH:mm:ss'

export const SORT_TYPE = {
  DESC : 'DESC',
  ASC : 'ASC'
}

export const CURRENCY_VALUE ={
  VND : 'vnd',
  USDT : 'usdt',
  USD : 'usd',
  BNB : 'bnb'
}

export const NAME_CURRENCY  = {
  [CURRENCY_VALUE.VND] : 'VND',
  [CURRENCY_VALUE.USDT] : 'USDT',
  [CURRENCY_VALUE.USD] : 'USD',
  [CURRENCY_VALUE.BNB] : 'BNB',

}

export const TYPE_SERVICE = {
  COMMENT : 'comment',
  FOLLOW : 'follow',
  RETWEET : 'retweet',
  LIKE : 'like',
  VIEW : 'view'
}