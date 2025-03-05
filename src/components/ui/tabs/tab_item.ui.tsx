import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

export interface TabItemProps extends ViewProps{
  index : number,
  activeIndex : number
}

const TabItem:React.FC<TabItemProps> = ({
  activeIndex ,
  index,
  children
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({

  });
  if(activeIndex === index){
    return (
      <>
        {children}
      </>
    );
  }
  return null;
};

export default TabItem;