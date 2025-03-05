//authentication
export const USER_LOGIN_WITH_OTP_URL = "/users/login"
export const USER_OTP_VERIFICATION_URL = "/users/validate-otp"
export const GET_USER_URL = "/users/me"
export const REFRESH_TOKEN_URL = "/users/refreshToken"
export const DELETE_USER_URL = "/drivers/delete/self"

//onboarding
export const UPLOAD_PERSONAL_INFO_URL = "/drivers/register/basic"
export const UPLOAD_PERSONAL_DOCS_URL = "/drivers/register/upload"
export const UPLOAD_BANK_INFO_URL = "/drivers/register/details"
export const UPLOAD_EMERGENCY_INFO_URL = "/drivers"


//s3 buckets url
export const FACE_BUCKET_URL = "/s3/bucket/face/pub"
export const AADHAAR_BUCKET_URL = "/s3/bucket/aadhaar-docs/prv"
export const PAN_BUCKET_URL = "/s3/bucket/pan-docs/prv"
export const DL_BUCKET_URL = "/s3/bucket/dl-docs/prv"
export const PASSBOOK_BUCKET_URL = "/s3/bucket/passbook-docs/prv"
export const VEHICLE_IMAGE_UPLOAD_URL = "/s3/bucket/checkin-vehicle/pub"
export const DRIVER_SELFIE_UPLOAD_URL = "/s3/bucket/checkin-selfie/pub"
export const GAS_BILL_UPLOAD_URL = "/s3/bucket/gas-bills/prv"

//checkIns
export const CHECK_IN_URL = "/checkin/in"
export const CHECK_OUT_URL = "/checkin/out"
export const CREATE_BREAK_URL = "/break/in"
export const CLOSE_BREAK_URL = "/break/out"


//clients
export const GET_CLIENTS_URL = "/clients/getClients"
export const GET_STORES_URL = "/store"

//logger 
export const LOGGER_URL = "/error-logging"


//city - state

export const GET_STATES_URL = "/smc/location?key=st"
export const GET_CITY_URL = "/smc/location?key=ct&value="


//docs verification
export const DOCS_VERIFICATION_URL = "/drivers/doc-ids"


//configs 
export const GET_CONFIGS_URL = "/config"
