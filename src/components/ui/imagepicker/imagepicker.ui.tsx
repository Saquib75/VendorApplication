// ImagePicker.js
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ViewProps } from 'react-native';
import RNImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { default_avatar_image } from '../../../assets/imports.assets';

export interface pickedImageProps { 
  cropRect: { 
    height: number; 
    width: number; 
    x: number; 
    y: number; 
  }, 
  height:number;
  width:number;
  mime: string; 
  modificationDate: number, 
  path: string
  size: number, 
}
export interface ImagePickerProps extends ViewProps {
  onPickedImage: (image:pickedImageProps ) => void;
}
const ImagePicker: React.FC<ImagePickerProps> = ({ children, onPickedImage = (image) => { } }) => {
  const [selectedImage, setSelectedImage] = useState<null|string>(null);

  const styles = StyleSheet.create({
    container: {
      width: 100,
      height: 100,
      borderRadius: 50,
      overflow: 'hidden',
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
    },
  });
  const openImagePicker = async () => {
    try {
      const image: ImageOrVideo = await RNImageCropPicker.openPicker({
        mediaType:'photo',
        width: 400,
        height: 400,
        cropping: true,
      });

      console.log("Image", image);
      //@ts-ignore
      onPickedImage(image);
      setSelectedImage(image.path);
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  return (
    <TouchableOpacity onPress={()=>openImagePicker()}>
      {
        children ?
          children :
          <View style={styles.container}>
            <Image
              source={selectedImage ? { uri: selectedImage } : default_avatar_image}
              style={styles.image}
            />
          </View>
      }
    </TouchableOpacity>
  );
};


export default ImagePicker;
