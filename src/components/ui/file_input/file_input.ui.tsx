import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewProps, Image as NativeImage, ActivityIndicator, Keyboard } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from '../text/text.ui';
import Avatar from '../avatar/avatar.ui';
import { default_avatar_image } from '../../../assets/imports.assets';
import VectorIcon from '../vector_icon/vector_icon';
import Modal from '../modal/modal.ui';
import Spacer from '../spacer/spacer.ui';
import RNImageCropPicker, { Image, ImageOrVideo } from 'react-native-image-crop-picker';
import { Notification, getFileData } from '../../../utils/functions.util';
import s3Service from '../../../services/s3.service';

export interface FileInputProps extends ViewProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorText?: string;
  url?: string,
  onChangeUrlOrKey: (url: string) => void;
  privateFile?: boolean;
  bucketUrl: string,
  big?: boolean,
  type?: 'photo' | "video" | 'file',
  onBlur?: () => void,
  cropping? : boolean
}

const FileInput: FC<FileInputProps> = ({
  label,
  required = false,
  error = false,
  errorText,
  style,
  url,
  onChangeUrlOrKey = () => { },
  onBlur = () => { },
  privateFile = false,
  bucketUrl,
  big = false,
  type = 'photo',
  cropping = false,
  ...rest
}) => {
  const { colors } = useTheme();
  const [visibleSelectionModal, setVisibleSelectionModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
    },
    upload_container: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      flexDirection: big ? 'column' : 'row',
      borderWidth: 1,
      borderColor: error ? colors.danger : colors.light_gray_border,
      borderStyle: 'dashed',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    content: {
      flex: 1,
      marginLeft: 10,
      justifyContent: "center",
      alignItems: 'center'
    },
    upload_btn: {
      flexDirection: 'row',
      padding: 5,
      paddingHorizontal: 15,
      borderRadius: 20,
      alignItems: 'center',
      borderColor: colors.primary,
      borderWidth: 1,

    },
    selection_container: {
      paddingHorizontal: 20,
      paddingBottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-evenly',

    },
    selection_box: {
      margin: 5,
      alignItems: 'center'
    },
    selection_icon: {
      backgroundColor: colors.primary + "34",
      padding: 15,
      borderRadius: 20,
      marginBottom: 10,
    },

  });
  const onUploadImage = () => {
    setVisibleSelectionModal(true);
    Keyboard.dismiss()
  }
  const openPicker = async (type: "gallery" | "camera" | 'file') => {
    let image;
    try {
      switch (type) {
        case 'gallery':
          image = await openGalleryPicker()
          return image;
        case 'camera':
          image = await openCameraPicker()
          return image;
        case 'file':

          break;

        default:
          break;
      }
    } catch (err: any) {
      Notification.error(err.message)
    }
  }
  const openGalleryPicker = () => {
    return new Promise<Image | undefined>((resolve, reject) => {
      setLoading(true);
      RNImageCropPicker.openPicker({
        mediaType: 'photo',
        width: 400,
        height: 400,
        cropping,
      }).then(async (images) => {
        setVisibleSelectionModal(false);
        const fileData:any = await getFileData(images)
        console.log(fileData,images.size);
        const response: any = await s3Service.uploadImage(fileData, bucketUrl);
        // setUri(response?.data?.data?.location);
        // console.log("response",response?.data?.data?.location);
        if(privateFile){
          onChangeUrlOrKey(response?.data?.data?.key);
        }else{
          onChangeUrlOrKey(response?.data?.data?.location);
        }
        onBlur()
        resolve(images);
      }).catch((err) => {
        console.log(err);
        setVisibleSelectionModal(false);
        reject(err);
      }).finally(() => {
        setLoading(false);
      });
    })
  };
  const openCameraPicker = async () => {
    return new Promise<Image | undefined>((resolve, reject) => {
      setLoading(true);
      RNImageCropPicker.openCamera({
        mediaType: 'photo',
        width: 400,
        height: 400,
        cropping,
      }).then(async (images) => {
        setVisibleSelectionModal(false);
        const fileData:any = await getFileData(images)
        console.log("SIZE : ",fileData,images.size);
        const response: any = await s3Service.uploadImage(fileData, bucketUrl);
        // setUri(response?.data?.data?.location);
        // console.log("response",response?.data?.data?.location);
        if(privateFile){
          onChangeUrlOrKey(response?.data?.data?.key);
        }else{
          onChangeUrlOrKey(response?.data?.data?.location);
        }
        onBlur()
        resolve(images);
      }).catch((err) => {
        console.log(err);
        setVisibleSelectionModal(false);
        reject(err);
      }).finally(() => {
        setLoading(false);
      });
    })
  };
  const LabelComponent = () => {
    if (label) {
      return (
        <Text style={{ marginBottom: big ? 10 : 5, color: error ? colors.danger : colors.text, textAlign: big ? 'center' : 'left', }} >{label}
          {required && <Text style={{ color: colors.danger }} > *</Text>}
        </Text>
      )
    }
    return null
  }
  return (<>
    <TouchableOpacity onPress={onUploadImage} style={styles.container} >
      {
        !big && <LabelComponent />
      }
      <View style={[styles.upload_container, style]} {...rest} >
        {
          big && <LabelComponent />
        }
        {
          !url ?
            (
              big ?
                null
                :
                <VectorIcon type='Ionicons' name={"image"} size={50} color={colors.light_gray_border} style={{ padding: 0 }} />
            )
            :
            (
              privateFile ?
                <>
                  <VectorIcon type='FontAwesome5' name={"file-pdf"} size={50} color={colors.danger} style={{ padding: 0, paddingLeft: 10 }} />
                </>
                :
                <Avatar
                  bottomIcon={{ size: 10, name: 'edit', type: 'MaterialIcons' }}
                  size={70}
                  source={url ? { uri: url } : default_avatar_image}
                />
            )
        }
        <View style={styles.content} >
          <View style={styles.upload_btn} >

            {
              loading ?
                <>
                  <ActivityIndicator animating color={colors.primary} size={"small"} />
                  <Text style={{ marginLeft: 10 }} >Uploading Image ...</Text>
                </>
                :
                (
                  url ?
                    <>
                      <VectorIcon type='Ionicons' name='checkmark-circle' color={colors.success} size={20} />
                      <Text>File uploaded</Text>
                    </>
                    :
                    <>
                      <VectorIcon name='camera' type='Feather' color={colors.gray} size={20} />
                      <Text>Upload {privateFile ? "File" : "Photo"}</Text>
                    </>
                )

            }
          </View>
        </View>
      </View>
      <Modal modalVisible={visibleSelectionModal} setModalVisible={setVisibleSelectionModal} >
        <Spacer size={30} />
        <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center' }} >Choose</Text>
        <Spacer size={10} />
        <View style={styles.selection_container} >
          {
            type == 'video' || type == 'photo' ? <>
              <View style={styles.selection_box} >
                <VectorIcon onPress={() => openPicker('camera')} style={styles.selection_icon} name='camera' type='Feather' />
                <Text>Camera</Text>
              </View>
              <View style={styles.selection_box} >
                <VectorIcon onPress={() => openPicker('gallery')} style={styles.selection_icon} name='image' type='Feather' />
                <Text>Gallery</Text>
              </View>
            </>
              :
              <View style={styles.selection_box} >
                <VectorIcon onPress={() => openPicker('file')} style={styles.selection_icon} name='file' type='Feather' />
                <Text>Device Storage</Text>
              </View>
          }

        </View>
      </Modal>
    </TouchableOpacity>
    {
      errorText && error ?
        <Text title small style={{ color: colors.danger }} >{errorText}</Text> : null
    }
  </>
  );
};

export default FileInput;