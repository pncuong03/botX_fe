import showMessage from "@components//Message";
import { MAX_LENGTH_PRICE } from "../constants";
import TYPE_CONSTANTS from "constants/type";

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const getImageAbsoluteUrl = (url: any) => {
  if (!url) {
    return '';
  }

  return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_SITE_URL}${url}`;
};

export { getImageAbsoluteUrl };

export const handleCopyInClipboard = (
  e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  text: string
) => {
  e.stopPropagation();
  navigator.clipboard.writeText(text ? text : "");
  showMessage(typeOfMessage.SUCCESS, 'Copied successfully!');
};

export const limitQuantity = (inputObj: any) => {
  const { value } = inputObj;
  const integerPath = (value || '').split('.')[0];
  if (integerPath.length > MAX_LENGTH_PRICE) {
    return false;
  }
  return true;
};

export const formatLongText =(value:string,prefixLength=10, suffixLength =10) =>{
  const prefix = value.slice(0, prefixLength);
  const suffix = value.slice(-suffixLength);
  return `${prefix}...${suffix}`;
}

export const shortText = (value:string,maxLength=20) =>{
  
if (value.length > maxLength) {
  const truncatedText = value.substring(0, maxLength) + '...';
return truncatedText
} 
return value
}