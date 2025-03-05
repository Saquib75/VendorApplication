import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {

  getItem: async (key: string) => {
    return new Promise<any>((resolve, reject) => {
      AsyncStorage.getItem(key, function (error, value: any) {
        if (error) {
          console.log('Error getting item (' + key + ') from local storage! ' + error.message);
          reject(null);
        } else {
          var json = JSON.parse(value);
          resolve(json);
        }
      });
    })
  },

  setKey: (key: string, value: any) => {
    return new Promise((resolve, reject) => {
      if (value) {
        console.log('start saving')
        var encoded = JSON.stringify(value);
        AsyncStorage.setItem(key, encoded, function (error) {
          if (error) {
            console.log('Error setting item (' + key + ') to local storage! ' + error.message);
            reject(error);
          } else {
            resolve(null);
          }
        });
      } else {
        console.log("value is missing");
        reject(new Error("value is missing"))
      }
    })
  },
  removeKey:  (key: string) =>{ // callback: error
    return new Promise((resolve,reject)=>{
      AsyncStorage.removeItem(key, function (error) { // callback: error
        if (error) {
          console.log('Error removing item (' + key + ') from local storage! ' + error.message);
          reject(error);
        } else {
          resolve(null);
        }
      });
    })
  },
  clear:  () =>{ // callback: error
    return new Promise((resolve,reject)=>{
      AsyncStorage.clear(function (error) { // callback: error
        if (error) {
          console.log('Error clearing storage! ' + error.message);
          reject(error);
        } else {
          console.log('Data cleared ');
          resolve(null);
        }
      });
    })
  }
}

export default Storage;