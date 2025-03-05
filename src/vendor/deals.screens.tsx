import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {FC, useState} from 'react';
import VectorIcon from '../components/ui/vector_icon/vector_icon';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from 'react-native-gifted-charts';
import {useTheme} from '@react-navigation/native';
import Container from '../components/hoc/container.hoc';
import Text from '../components/ui/text/text.ui';

const {height, width} = Dimensions.get('screen');

const DealsVscreen: FC<any> = ({navigation}) => {
  const {colors} = useTheme();

  const [selected, setSelected] = useState(0);
  const [Deal, setDeal] = useState(true);
  const piedata = [
    {value: 30, color: '#EE5C74', text: '54%'},
    {value: 20, color: '#4A38BA', text: '30%'},
    {value: 50, color: '#2083F6', text: '26%'},
  ];
  const barData = [
    {value: 1, label: 'Toronto', frontColor: '#71F26D'},
    {value: 2, label: 'WaterLoo', frontColor: colors.vendorPrimary},
    {value: 3, label: 'Kitchener', frontColor: '#C2DC42'},
    {value: 4, label: 'London', frontColor: '#61DFDD'},
  ];
  const Linedata = [
    {value: 0, label: 'Mon'},
    {value: 20, label: 'Tue'},
    {value: 10, label: 'Wed'},
    {value: 25, label: 'Thu'},
    {value: 25, label: 'Fri'},
    {value: 20, label: 'Sat'},
    {value: 20, label: 'Sun'},
  ];
  const boxes = [
    {
      name: 'People \nreached',
      items: 41,
      color: colors.vendorPrimary,
      text: '#F9F9F9',
    },
    {
      name: 'Post \nActivity',
      items: 28,
      color: '#FAD6AD',
      text: '#000000',
      margin: true,
    },
    {name: 'Links \nClicks', items: 14, color: '#FFFFFF', text: '#000000'},
  ];
  const listitems = [
    {
      img: require('../assets/images/kfc.png'),
      title: 'KFC - 1',
      desc: 'TWO DAYS$2 Two Pieces',
      date: '07 Feb, 2024 - 14 Feb, 2024',
      color: '#2083F6',
    },
    {
      img: require('../assets/images/kfc2.png'),
      title: 'KFC - 2',
      desc: '50% discount available ',
      date: '07 Feb, 2024 - 14 Feb, 2024',
      color: '#EE5C74',
    },
    {
      img: require('../assets/images/kfc2.png'),
      title: 'KFC - 3',
      desc: '50% discount available ',
      date: '07 Feb, 2024 - 14 Feb, 2024',
      color: '#4A38BA',
    },
  ];

  const DealClicked = () => {
    setDeal(!Deal);
  };
  const styles = StyleSheet.create({
    flex: {flex: 1},
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '3%',
    },
    headertext: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 26,
      lineHeight: 39,
    },
    bar: {
      width: '100%',
      backgroundColor: '#F9F9F9',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bartext: {
      fontSize: 22,
      fontWeight: '400',
      color: '#000000',
      margin: 5,
    },
    dealimg: {
      margin: '4%',
      marginRight: '3%',
      width: 70,
      height: 70,
      alignSelf: 'center',
    },
    dealstext: {
      color: colors.vendorPrimary,
      fontSize: 24,
      fontWeight: '500',
      lineHeight: 33,
      marginVertical: 20,
    },
    dealscontainer: {
      width: '100%',
      backgroundColor: '#18191C',
      borderRadius: 15,
      alignSelf: 'center',
      marginBottom: 10,
      flexDirection: 'row',
    },
    dealsubcon: {alignSelf: 'center', flex: 1},
    dealstitle: {
      color: colors.vendorPrimary,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 21,
      marginBottom: 5,
    },
    dealsdesc: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 21,
    },
    delscont: {
      flex: 1.9,
      justifyContent: 'space-between',
      marginVertical: '5%',
      marginRight: '5%',
    },
    delstext: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 12,
      alignSelf: 'flex-end',
      lineHeight: 15,
    },
    delstoch: {
      backgroundColor: colors.vendorPrimary,
      borderRadius: 5,
      marginTop: 10,
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view: {
      color: '#fff',
      fontWeight: '500',
      fontSize: 14,
      margin: 6,
      marginHorizontal: 25,
      lineHeight: 15,
    },
    statsconst: {
      width: '100%',
      backgroundColor: '#18191C',
      borderRadius: 15,
      alignSelf: 'center',
      marginBottom: '3%',
    },
    statssub: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      flex: 1,
    },
    points: {
      margin: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cirlc: {
      width: 20,
      height: 20,
      borderRadius: 100,
    },
    views: {
      marginHorizontal: '7%',
      marginBottom: '5%',
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '500',
      color: '#FFFFFF',
    },
    overview: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 22,
      lineHeight: 33,
    },
    overviewcon: {
      flexDirection: 'row',
      width: '100%',
    },
    userstats: {
      height: 100,
      flex: 1,
      borderRadius: 10,
      padding: 10,
      justifyContent: 'space-between',
    },
    userstatext: {fontWeight: '500', fontSize: 16},
    extrastats: {
      fontWeight: '500',
      fontSize: 16,
    },
    statistic: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 22,
      lineHeight: 33,
      margin: '5%',
      marginBottom: 10,
    },
    today: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    todaytxt: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 16,
      marginHorizontal: 20,
      lineHeight: 21,
      margin: 5,
    },
    todaystoch: {marginHorizontal: 0, borderRadius: 5, alignItems: 'center'},
    linebarcon: {
      padding: 10,
      paddingVertical: 30,
      backgroundColor: '#18191C',
      width: '100%',
      marginTop: 20,
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    topcity: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 22,
      lineHeight: 33,
      margin: '5%',
      marginBottom: 0,
    },
    barcon: {
      backgroundColor: '#18191C',
      width: '100%',
      marginTop: 0,
      alignSelf: 'center',
      borderRadius: 15,
      marginBottom: 30,
      padding: 20,
    },
  });

  const ListDeals = () => (
    <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
      <Text style={styles.dealstext}>Deals</Text>
      {listitems.map((item, index) => (
        <View style={styles.dealscontainer} key={index}>
          <Image
            source={item.img}
            style={styles.dealimg}
            resizeMode="cover"></Image>
          <View style={styles.dealsubcon}>
            <Text style={styles.dealstitle}>{item.title}</Text>
            <Text style={styles.dealsdesc}>{item.desc}</Text>
          </View>

          <View style={styles.delscont}>
            <Text style={styles.delstext}>{item.date}</Text>
            <TouchableOpacity style={styles.delstoch} onPress={DealClicked}>
              <Text style={styles.view}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={styles.statsconst}>
        <View style={styles.statssub}>
          {listitems.map((item, index) => (
            <View style={styles.points} key={index}>
              <View style={[styles.cirlc, {backgroundColor: item.color}]} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#FFFFFF',
                }}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>

        <View style={{alignSelf: 'center', marginTop: 10}}>
          <PieChart
            data={piedata}
            donut
            focusOnPress
            backgroundColor="#18191C"
            radius={60}
            // showGradient
          />
        </View>
        <Text style={styles.views}>Views</Text>
      </View>
    </ScrollView>
  );

  const DealStats = () => (
    <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
      <Text style={[styles.dealstext, {color: '#fff'}]}>Overview</Text>
      <View style={styles.overviewcon}>
        {boxes.map((item, index) => (
          <View
            style={[
              styles.userstats,
              {
                backgroundColor: item.color,
                marginHorizontal: item.margin ? 10 : 0,
              },
            ]}
            key={index}>
            <Text
              style={{
                color: item.text,
                ...styles.userstatext,
              }}>
              {item.name}
            </Text>

            <Text
              style={{
                color: item.text,
                ...styles.extrastats,
              }}>
              {item.items}
            </Text>
          </View>
        ))}
      </View>
      <Text style={[styles.dealstext, {color: '#fff'}]}>Statistics</Text>

      <View style={styles.today}>
        {['Today', 'Last 7 days', '30 days'].map((item, index) => (
          <TouchableOpacity
            style={{
              ...styles.todaystoch,
              backgroundColor:
                index == selected ? colors.vendorPrimary : '#18191C',
            }}
            key={index}
            onPress={() => setSelected(index)}>
            <Text style={styles.todaytxt}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.linebarcon}>
        <LineChart
          data={Linedata}
          maxValue={30}
          noOfSections={4}
          rulesType="solid"
          rulesColor="#454343"
          color="#4A38BA"
          thickness={1.5}
          rulesThickness={1}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisColor={'#FFFFFF'}
          backgroundColor={'#18191C'}
          yAxisTextStyle={{color: '#F9F9F9'}}
          xAxisLabelTextStyle={{color: '#F9F9F9'}}
          stepHeight={30}
          spacing={(width * 9) / 100}
          hideDataPoints
          // stepHeight={5}
          // curved
          // hideAxesAndRules
          // rulesConfigArray={}
          // verticalLinesColor={'#4A38BA'}
        />
      </View>
      <Text style={[styles.dealstext, {color: '#fff'}]}>Top Cities</Text>

      <View style={styles.barcon}>
        {/* <BarChart
          horizontal
          barWidth={17}
          barBorderRadius={6}
          data={barData}
          yAxisExtraHeight={0}
          hideYAxisText
          hideRules
          yAxisAtTop
          xAxisLabelTextStyle={{color: '#F9F9F9'}}
          yAxisThickness={0}
          xAxisThickness={0}

        /> */}
        {barData.map((item, index) => (
          <View
            style={{
              padding: 5,
              paddingHorizontal: 10,
              backgroundColor: item.frontColor,
              marginBottom: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: '#000', fontSize: 18}}>{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
  return (
    <Container>
      <View style={styles.flex}>
        {/* <View style={styles.header}>
        <VectorIcon
          type="Octicons"
          name="three-bars"
          size={40}
          color={'#FFFFFF'}
          onPress={DealClicked}
        />
        <Text style={styles.headertext}>Hi, Saif</Text>
        <VectorIcon
          type="FontAwesome5"
          name="chevron-right"
          color={'#FFFFFF'}
          size={35}
          onPress={DealClicked}
        />
      </View> */}
        <View style={[styles.bar]}>
          <Text style={styles.bartext}>
            {Deal ? 'Deals List' : 'Overview - KFC 2'}
          </Text>
        </View>
        {Deal ? ListDeals() : DealStats()}
      </View>
    </Container>
  );
};

export default DealsVscreen;
