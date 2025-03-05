import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Pressable} from 'react-native';
type dataType = {
  source: any;
  deepLink?: string;
};
export interface CarouselProps extends ViewProps {
  autoPlay?: boolean;
  data: dataType[];
  dots?: boolean;
  height?: number;
  scrollMs?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  height,
  scrollMs = 5000,
  dots = false,
  data = [],
  autoPlay = false,
}) => {
  const [active, setActive] = useState(0);
  const scrollRef: any = useRef(null);
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      // margin: 10,
      // backgroundColor : 'red'
      marginBottom: dots ? 10 : 0,
    },
    wrapDot: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: -20,
      left: 0,
      right: 0,
    },
    wrap: {
      // backgroundColor: 'red',
    },
    dot: {
      height: 6,
      width: 6,
      borderRadius: 10,
      marginLeft: 3,
      backgroundColor: colors.white,
    },
    dotActive: {
      height: 10,
      width: 10,
      borderRadius: 10,
      marginLeft: 3,
      backgroundColor: colors.primary,
    },
    item: {
      width: Dimensions.get('window').width - 20,
      height: height ?? Dimensions.get('window').height * 0.2, // 25% window
      borderRadius: 10,
      overflow: 'hidden',
    },
  });
  const change = (nativeEvent: any) => {
    if (nativeEvent) {
      const slide = Math.floor(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      setActive(slide);
      if (slide !== active) {
      }
    }
  };
  if (autoPlay) {
    useEffect(() => {
      if (data.length !== 0) {
        let interval = setInterval(() => {
          setActive(prev => {
            let count = 0;
            if (prev + 1 < data.length) {
              count = prev + 1;
            } else {
              count = 0;
            }
            scrollRef.current.scrollTo({
              animated: true,
              y: 0,
              x: (Dimensions.get('screen').width - 0) * count,
            });
            return count;
          });
        }, scrollMs);

        return () => {
          clearInterval(interval);
        };
      }
    }, [data]);
  }
  if (data.length == 0) return null;
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          // onScroll={({ nativeEvent })=> change(nativeEvent)}
          onMomentumScrollEnd={({nativeEvent}) => change(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          // style={styles.wrap}
          ref={scrollRef}>
          {data.map((e, index) => (
            <Pressable
              onPress={() => (e.deepLink ? Linking.openURL(e.deepLink) : null)}
              key={index}
              style={styles.item}>
              <Image
                resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={e.source}
              />
            </Pressable>
          ))}
        </ScrollView>
        {dots && (
          <View style={styles.wrapDot}>
            {data.map((e, index) => (
              <View
                key={index}
                style={active === index ? styles.dotActive : styles.dot}></View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
export default Carousel;
