import React, {useEffect, useState} from 'react';
import Container from '../components/hoc/container.hoc';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/ui/text/text.ui';
import {useTheme} from '@react-navigation/native';
import {VENDOR_ROUTES} from '../utils/route_names.util';
import VectorIcon from '../components/ui/vector_icon/vector_icon';
import Spacer from '../components/ui/spacer/spacer.ui';
import {MMKV} from 'react-native-mmkv';
import {getVendorBusiness} from '../api/functions/business';
import {useAuthContext} from '../api/authContext';

function BusinessScreeen({navigation}: {navigation: any}) {
  const {colors} = useTheme();
  const [loading, setloading] = useState(true);
  const {user} = useAuthContext();
  const styles = StyleSheet.create({
    businessText: {
      color: colors.vendorPrimary,
      fontSize: 25,
      fontWeight: '700',
      letterSpacing: 0.3,
      marginTop: 10,
    },
    businessContainer: {
      backgroundColor: '#ededed',
      padding: 20,
      paddingVertical: 40,
      width: '90%',
      borderRadius: 20,
      position: 'relative',
      zIndex: 99,
    },
    businessName: {
      color: '#000',
      fontSize: 18,
    },
    status: {
      padding: 5,
      paddingHorizontal: 10,
      backgroundColor: colors.vendorPrimary,
      borderRadius: 10,
      width: '100%',
      marginTop: 7,
      letterSpacing: 0.2,
    },
    button: {
      flexDirection: 'row',
      marginBottom: 0,
      alignItems: 'center',
      width: '100%',
      height: 56,
      backgroundColor: '#999',
      justifyContent: 'center',
      borderRadius: 8,
      marginTop: 10,
    },
  });

  const [businessList, setbusinessList] = useState([]);
  const storage = new MMKV();
  useEffect(() => {
    const fetchBusiness = async () => {
      if (!user?.id) return;
      try {
        const res = await getVendorBusiness(user.id);
        console.log(res);
        // setbusinessList(res);
      } catch (error) {
        console.error('Error fetching business:', error);
      }
    };

    fetchBusiness(); // ✅ Call the function
  }, [user?.id]);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          position: 'relative',
          //   flexDirection: 'column',
          //   justifyContent: 'center',
        }}>
        {businessList ? (
          <View
            style={{
              padding: 10,
              paddingVertical: 7,
              backgroundColor: colors.text,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22,
                letterSpacing: -0.2,
                color: '#000',
              }}>
              Select Any Business
            </Text>
          </View>
        ) : (
          <View
            style={{
              padding: 10,
              paddingVertical: 7,
              backgroundColor: colors.vendorPrimary,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 22, letterSpacing: -0.2}}>
              Create more than 1 Business
            </Text>
          </View>
        )}

        {businessList ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.businessContainer}>
              {businessList.map((business, id) => (
                <View style={{flexDirection: 'row', marginBottom: 20}} key={id}>
                  <Image
                    source={require('../assets/images/category.png')}
                    style={{borderRadius: 999}}
                  />
                  <View
                    style={{
                      marginLeft: 20,
                      flex: 1,
                      paddingBottom: 20,
                      borderBottomColor: '#45434335',
                      borderBottomWidth: 1,
                    }}>
                    <Text style={styles.businessName}>{business.name}</Text>
                    <Text
                      style={{
                        ...styles.status,
                        backgroundColor:
                          business.status === 'pending'
                            ? colors.vendorPrimary
                            : business.status === 'approved'
                            ? '#3F9469'
                            : colors.primary,
                      }}>
                      {business.status === 'pending'
                        ? 'Verification Pending'
                        : business.status === 'approved'
                        ? 'Approved'
                        : 'Incomplete'}
                    </Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate(VENDOR_ROUTES.CreateBusiness)
                }>
                <VectorIcon
                  type="AntDesign"
                  name="pluscircle"
                  size={25}
                  color="#fff"
                />

                <Text
                  style={{
                    ...styles.businessName,
                    color: '#fff',
                    marginLeft: 5,
                  }}>
                  Create Store
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate(VENDOR_ROUTES.CreateBusiness)}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/images/store.png')} />
            <Text style={styles.businessText}>+ Create Business</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Image
        source={require('../assets/images/Ellipse5.png')}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: -1,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/Ellipse6.png')}
        style={{
          position: 'absolute',
          top: 120,
          right: 0,
          zIndex: -1,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}

export default BusinessScreeen;
