export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  meta?: any;
}


export interface FormBuy {
  link:string,
  quantity:number | string,
  price:any | null,
}

export interface FormEditProfile {
  username: string,
  email: string,
  phoneNumber: number | null,
  currentPassword: string,
  newPassword: string,
  bankName: string | null,
  accountName: string,
  accountNumber: number | null,
  avatarUrl: string,
}


export interface DataService {
  deletedAt ?: string,
  desc ?: string,
  guarantee ?: boolean,
  id ?: number,
  isHot ?: boolean,
  maxQuantity ?: number,
  minQuantity ?: number,
  price ?: string,
  title ?: string,
  typeService ?: string,
  favourite?:boolean
}

export enum StatusOrder {
  ACTIVE = 'active',
  ERROR = 'error',
  DONE = 'done',
  PROCESSING = 'processing',
}