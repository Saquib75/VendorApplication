// import {  ENV, PROD_BASE_URL } from "@env";
// const BASE_URL = "https://dev.little-boy.fullfily.com/api"
const BASE_URL = "https://api.stage.dashboard.fullfily.com/api"
// console.log( "ENVs ==> ",ENV , BASE_URL ,PROD_BASE_URL);

let b = BASE_URL;
// if(ENV == 'production'){
//     b = PROD_BASE_URL
// }

export const base = b;

const version = "/v2"
export const base_url = base + version
export const APP_DEEPLINK_PREFIX = "fullfilyflyers://app/";

export const SIGN_UP = "SIGN_UP"
export const LOG_IN = "LOG_IN"
export const STATUSES = {
    IDLE : 'IDLE',
    SUCCESS : 'SUCCESS',
    FAILED : "FAILED",
    PENDING : "PENDING"
}
export type STATUSESType = 'IDLE'| 'SUCCESS' | "FAILED" | "PENDING"
export const DEV_ENV = "development"

export const THEME_MODE = {
    SYSTEM_DEFAULT : "system-default",
    LIGHT : "light",
    DARK : "dark",
}
export const SERVICE_TYPE = {
    SMC : "SMC",
    PARKING_AND_CHARGING  : "PARKING_AND_CHARGING",
    
}
export const PNC_TYPE  = {
    PARKING : "PARKING",
    CHARGING : "CHARGING"
}

export const VEHICLE_TYPES = {
    TWO_WHEELER : "Two wheeler",
    THREE_WHEELER : "Three wheeler",
    FOUR_WHEELER : "Four wheeler",
}

export const TRANSACTION_TYPE = {
    POSITIVE : "POSITIVE",
    NEGATIVE : "NEGATIVE"
}

export const PAYMENT_PROCESSOR_ENUMS = {
    WALLET_AMOUNT_CREDIT_UNIQ_IDENTIFIER : "WALLET_AMOUNT_CREDIT_UNIQ_IDENTIFIER"
}

export const ORDER_STATUS = {
    PICKUP_PENDING : "PICKUP_PENDING",
    PICKUP_FAILED : "PICKUP_FAILED",
    PICKUP_RESCHEDULED : "PICKUP_RESCHEDULED",
    DELIVERY_FAILED : "DELIVERY_FAILED",
    DELIVERED : "DELIVERED",
    DELIVERY_PENDING : "DELIVERY_PENDING",
    DELIVERY_RESCHEDULED : "DELIVERY_RESCHEDULED",
}

