import { CURRENCY_VALUE, EXTERNAL_LINK_REGEX, TRANSACTION_HASH_REGEX } from "../constants/index";
import { number, object, string, array, mixed, ref, boolean } from "yup";

export const formBuySchema = () => {
  return object({
    link: string()
      .required("Link is required")
      .trim()
      .matches(
        EXTERNAL_LINK_REGEX,
        "Please enter a valid link that contains https:// or http://"
      ),
      quantity:number().required("Quantity is required").when(['minQuantity'], (minQuantity, schema)  => {
        return schema.test('max-not-less-than-min', `Quantity > ${minQuantity} `, (value:any,values:any) => {
          return minQuantity <= value  
        })
      }).when(['maxQuantity'], (maxQuantity, schema)  => {
        return schema.test('max-not-less-than-min', `Quantity < ${maxQuantity}  `, (value:any,values:any) => {
          return maxQuantity >= value  
        })
      }),
  });
};
import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone must only contain digits")
    .min(10)
    .max(10)
    .required("Username is required"),
  password: Yup.string().min(4).max(20).required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone must only contain digits")
    .required("Phone is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  repassword: Yup.string()
    .required("Repassword is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  affiliate: Yup.string().nullable(),
});

export const forgotSchema = Yup.object().shape({
  contact: Yup.string()
    .required("Please enter your phone number or email")
    .matches(
      /^(?:\d{10}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})$/,
      "Invalid phone number or email format"
    ),
});

export const cartListSchema = () => {
  return object({
    carts: array(
      object({
        checked: boolean(),
        link: mixed().when("checked", {
          is: true,
          then: string()
            .required("Link is required")
            .trim()
            .matches(
              EXTERNAL_LINK_REGEX,
              "Please enter a valid link that contains https:// or http://"
            ),
          otherwise: string().notRequired(),
        }),
        quantity:number().required("Quantity is required").when(['minQuantity'], (minQuantity, schema)  => {
          return schema.test('max-not-less-than-min', `Quantity > ${minQuantity} `, (value:any,values:any) => {
            return minQuantity <= value  
          })
        }).when(['maxQuantity'], (maxQuantity, schema)  => {
          return schema.test('max-not-less-than-min', `Quantity < ${maxQuantity}  `, (value:any,values:any) => {
            return maxQuantity >= value  
          })
        }),
      })
    ),
  });
};

export const formAffilicateSchema = () => {
  return object({
    affilicateLink: string()
      .trim()
      .matches(
        EXTERNAL_LINK_REGEX,
        "Please enter a valid link that contains https:// or http://"
      ),
  });
};

export const amountPaymentSchema = Yup.object().shape({
  amountDeposit: string().required("Amount is required"),
});

export const paymentSchema = Yup.object().shape({
  amountDeposit: string().required("Amount is required"),
  txHash: string().nullable().when(["currency"], (currency, schema) => {
    return [CURRENCY_VALUE.USDT, CURRENCY_VALUE.BNB]?.includes(currency)
      ? string().required("Transaction hash is required").trim().matches(TRANSACTION_HASH_REGEX,'Please enter a valid format transaction hash')
      : schema.notRequired();
  }),
});


export const affiliateSchema = Yup.object().shape({
  balanceAffiWithdrawn: string().required("Amount is required"),
});