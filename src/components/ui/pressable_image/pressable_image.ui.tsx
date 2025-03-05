import React from 'react';
import { Image, ImageProps, Pressable,} from 'react-native';

export interface PressableImageProps extends ImageProps{
  onPress? : ()=>void;
}


const PressableImage:React.FC<PressableImageProps> = ({onPress, ...rest}) => {
  return (
    <Pressable onPress={onPress} >
      <Image {...rest} />
    </Pressable>
  );
};

export default PressableImage;