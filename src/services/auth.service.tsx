// import { ENV } from "@env";
import { DELETE_USER_URL, DOCS_VERIFICATION_URL, GET_USER_URL, UPLOAD_BANK_INFO_URL, UPLOAD_EMERGENCY_INFO_URL, UPLOAD_PERSONAL_DOCS_URL, UPLOAD_PERSONAL_INFO_URL, USER_LOGIN_WITH_OTP_URL, USER_OTP_VERIFICATION_URL } from "../utils/urls.utils";
import service from "./service";
// import { DEV_ENV } from "../utils/constants.util";
import { Notification, encryptWithKey, handleServiceError } from '../utils/functions.utils';


type dataType = {
  mobile: string | number;
  method: string;
}

const authService = {
  send_otp: (data: dataType) => {
    return new Promise((resolve, reject) => {
      let config = {}

      service().post(USER_LOGIN_WITH_OTP_URL, {
        data: encryptWithKey(data),
      }, config).then((res: any) => {
        // if (res.data.status) {
        resolve(res)
        // } else {
        //   reject(res)
        // }
      }).catch(err => {
        Notification.error(handleServiceError(err), "Can't send OTP");
        console.log(err);
        reject(err);
      })
    })
  },
  verify_otp: (data: {
    mobile: string | number;
    otp: string | number;
  }) => {
    return new Promise((resolve, reject) => {
      service().post(USER_OTP_VERIFICATION_URL, {
        data: encryptWithKey(data),
      }).then((res: any) => {
        if (res.data.status) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(err => {
        console.log(err);
        Notification.error(err.response.data.message, "Cannot Verify otp")
        reject(err);
      })
    })
  },
  get_user_data: () => {
    return new Promise((resolve, reject) => {
      service().get(GET_USER_URL).then((res: any) => {
        if (res.data.status) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(err => {
        console.log(err);
        // Notification.error(handleServiceError(err),"Error");
        reject(err);
      })
    })
  },
  delete_account: () => {
    return new Promise((resolve, reject) => {
      service().delete(DELETE_USER_URL).then((res: any) => {
        if (res.data.status) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(err => {
        console.log(err);
        // Notification.error(handleServiceError(err),"Error");
        reject(err);
      })
    })
  },
  verifyDocs: (payload:{
    userId : string,
    data  :any,
    key : string
  }) => {
    return new Promise((resolve, reject) => {
      service().put(DOCS_VERIFICATION_URL,{
       data : encryptWithKey({
        _id : payload.userId,
        [payload.key] : payload.data
       })
      }).then((res: any) => {
        if (res.data.status) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(err => {
        console.log(err);
        // Notification.error(handleServiceError(err),"Error");
        reject(err);
      })
    })
  },

}


export default authService;