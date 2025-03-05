import { Alert, Linking, PermissionsAndroid, Platform, ToastAndroid } from 'react-native'
// import JSEncrypt from "jsencrypt"
// import { ENV, RSA_KEY } from "@env"
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import Storage from './storage.utils';
import { APP_DEEPLINK_PREFIX, DEV_ENV, base_url } from './constants.util';
// import { PERMISSIONS, RESULTS, request, requestMultiple, requestNotifications } from 'react-native-permissions';
// import { Image as ImageCompress } from "react-native-compressor";
import service from '../services/service';
import { LOGGER_URL } from './urls.utils';
import axios from 'axios';
export const showToast = (msg: string) => {
  // ToastAndroid.showWithGravity(
  //     msg,
  //     ToastAndroid.SHORT,
  //     ToastAndroid.CENTER
  // );
  Alert.alert("Error :", JSON.stringify(msg))
}
export const encryptWithKey = (plainText: any, isJSON: boolean = true) => {
  // console.log(plainText)
  // if (isJSON) {
  //   plainText = JSON.stringify(plainText);
  // }
  // const enc = new JSEncrypt();
  // enc.setPublicKey(RSA_KEY);
  // const cypherText = enc.encrypt(plainText);
  // return cypherText
}

export const handleServiceError: string | any = (error: any) => {
  try{
    if (error?.response?.data?.error?.errors[0]?.display_msg) {
      return error.response.data.error.errors[0].display_msg
    } else if (error?.response?.data?.message) {
      return error?.response?.data?.message;
    } else if (error?.message) {
      return error?.message;
    } else if (error?.response) {
      return error?.response;
    } else {
      console.log("Service Error =>", error);
      return "Something went wrong";
    }
  }catch(err){
    console.log("Service Error =>", err);
    return "Something went wrong"
  }
};


export const grantPermissionForLocation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      
      // if (Platform.OS === "ios") {
      //   // asking permission for IOS
      //   // const resultN = await requestNotifications(['alert','badge','sound']);
      //   // console.log("NNNN",resultN);
      //   const resultIOS = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      //   resolve(resultIOS === 'granted')
      // } else {
      //   // asking permission for android
      //   // const notificationRes = await requestNotifications(['alert','badge','sound']);
      //   // console.log("Notifications :",notificationRes);
      //   await requestMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then((statuses) => {
      //     console.log('COARSE LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
      //     console.log('ACCESS FINE LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
      //     resolve(
      //       statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED 
      //     && 
      //     statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED 
      //     )
      //   });
      // }
      resolve(false)
    } catch (err) {
      console.log('Location permission not granted!',err)
      reject(err);
    }
  })
}
export const Notification = {
  success: (message: string, title: string = 'Success') => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title,
      textBody: message,
    })
  },
  error: (message: string, title: string = "Error") => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title,
      textBody: message,
    })
  },
  warning: (message: string, title: string = "Info") => {
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title,
      textBody: message,
    })
  },
}

type alertType = {
  title: string;
  body: string;
  yesText: string;
  yesAction: () => void;
  noText: string;
  noAction: () => void
}
export const confirmAsyncAlert = ({ title = "Alert", body = "Alert body", yesText = "YES", yesAction = () => { }, noText = "NO", noAction = () => { } }: alertType) => {
  return new Promise((resolve, reject) => {
    try {
      Alert.alert(
        title,
        body,
        [
          {
            text: yesText,
            onPress: async() => {
              await yesAction()
              resolve(true)
            }
          },
          {
            text: noText,
            onPress: () => {
              noAction();
              resolve(false)
            },
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      reject(error)
    }
  })
}

export const getOrDefault = (obj: any, key: string, defaultValue: any) => {
  if (key in obj) {
    return obj[key];
  }
  return defaultValue;
}

export const openMobileNumber = async (number: string | number) => {
  try {
    if (Platform.OS === 'ios') {
      await Linking.openURL(`telprompt:${number}`);
    }
    else {
      await Linking.openURL(`tel:${number}`);
    }
  } catch (err) {
    console.log("failed to open mobile number", err);
  }
  return;
}
export const openDeepLink = (deepLink: string) => Linking.openURL(APP_DEEPLINK_PREFIX + deepLink);



export type coordPoints = {
  latitude: number,
  longitude: number
}

export type decodedDataType = coordPoints

export const decodePolyline = (polyline: any) => {
  const points: decodedDataType[] = [];
  let index = 0,
    len = polyline.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;

    do {
      b = polyline.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = polyline.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }

  return points;
};

export const calculateCenterPointFromSrcToDes = ({ source, destination }: {
  source: coordPoints,
  destination: coordPoints
}) => {
  return {
    latitude: (source.latitude + destination.latitude) / 2,
    longitude: (source.longitude + destination.longitude) / 2,
  };
};

export const calculateLocationDelta = (points: coordPoints[], type?: 'latitude' | 'longitude') => {
  const minLat = Math.min(...points.map((point) => point.latitude));
  const maxLat = Math.max(...points.map((point) => point.latitude));
  const minLng = Math.min(...points.map((point) => point.longitude));
  const maxLng = Math.max(...points.map((point) => point.longitude));

  const padding = 0.1; // You can adjust this padding as needed
  const extraHeight = 0.3; // You can adjust this value as needed

  return {
    latitudeDelta: (maxLat - minLat) * (1 + extraHeight) + padding,
    longitudeDelta: (maxLng - minLng) + padding,
  };
};
export const formatPhoneNumber= (phoneNumber:string) =>{
  // Remove any non-numeric characters from the phone number
  const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Use regular expression to split the number into two groups of 5 digits each
  const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{5})(\d{5})/, '$1 $2');

  return formattedPhoneNumber;
}
export const compressImage = async (file: string) => {
  // const result = await ImageCompress.compress(file, {
  //   compressionMethod: "auto",
  //   quality: 0.5,
  // });
  // return result;
};
export const getFileData = async(file: any, compress:boolean | undefined = true) => {
  if(compress){
    let compressedPath = await compressImage(file.path);
    file.path = compressedPath;
  }
  const filePathArray = file?.path?.split("/");
  const fileName = filePathArray.pop();
  return { name: fileName, uri: file.path, type: file.mime };
};

export const serviceLogger  = async(data:any)=>{
  try{
    const user_id = await Storage.getItem('user-id')
    const payload = {
      id: user_id,
      full_url: data?.response?.request?.responseURL,
      method: data?.config?.method,
      status_code: data?.response?.status,
      request_headers: JSON.stringify(data?.request?.headers),
      request_body: JSON.stringify(data?.request?.data),
      response_headers: JSON.stringify(data?.response?.headers),
      response_body: JSON.stringify(data?.response?.data),
      other: null,
      methodInCode: null 
    }
    if(!__DEV__){
      // console.log("LOGGER : ", payload);
      // console.log("LOGGER DATA : ", data);
      axios.post(base_url+LOGGER_URL,payload).then(({data})=>{
        if(data.status){
          console.log("Sent to logger");
        }else{
          throw new Error(data);
        }
      }).catch((e)=>{
        throw new Error(e);
      })
    }
  }catch(err){
    console.log("LOGGER FAILED", err);
    
  }
}