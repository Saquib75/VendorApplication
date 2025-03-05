import { StyleSheet, View } from 'react-native'
import React from 'react'

export interface SpacerProps {
    size? : number,
    horizontal? : boolean;
}

const Spacer:React.FC<SpacerProps> = ({size = 15 , horizontal = false}) => {
  return (
    <View style={{
        height : horizontal ? 0 :size,
        width : horizontal ? size : 0,
    }}>
    </View>
  )
}

export default Spacer
