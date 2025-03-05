import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import Container from './../components/hoc/container.hoc';
import Imports from './../assets/imports.assets';
import {ACCOUNT_ROUTES, VENDOR_ROUTES} from './../utils/route_names.util';
import {useTheme} from '@react-navigation/native';
import AppHeader from './../components/app_header.component';
import Text from './../components/ui/text/text.ui';
import TextInput from '../components/ui/text_input/text_input.ui';
import VectorIcon from '../components/ui/vector_icon/vector_icon';
import Spacer from '../components/ui/spacer/spacer.ui';
import * as yup from 'yup';
import Dropdown from '../components/ui/select_dropdown/select_dropdown.ui';

type Form = {
  name: string;
  phone: string;
  country: string;
  email: string;
  agreed: boolean;
  logo: Asset | undefined;
};
const CreateBusiness: React.FC<any> = ({navigation}) => {
  const {colors} = useTheme();
  const [page, setPage] = useState(1);
  const [formData, setformData] = useState<Form>({
    name: '',
    phone: '',
    country: '',
    email: '',
    agreed: false,
    logo: undefined,
  });
  const nums = [
    {1: 'Basic'},
    {2: 'Location'},
    {3: 'Verification'},
    {4: 'Status'},
  ];
  const pickImage = (propertyName: string) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets?.[0];
        setformData({...formData, [propertyName]: selectedImage});
      }
    });
  };
  const SetLocation = () => (
    <View style={{flex: 1}}>
      <View style={styles.wbox}>
        <Text style={styles.gpstext}>Choose Your GPS Location</Text>
        {/* <View style={{...styles.flexd, marginVertical: 20}}>
          <View
            style={[
              styles.whitebox,
              {width: '12%', margin: 0, marginRight: 10},
            ]}>
            <VectorIcon
              type="Entypo"
              name="location"
              size={26}
              color={'#FFFFFF'}
              onPress={() => console.log('')}
            />
          </View>
          <TouchableOpacity style={styles.box}>
            <Text>Search by location, Area</Text>
            <VectorIcon
              type="FontAwesome"
              name="close"
              size={15}
              color={'#FFFFFF'}
            />
          </TouchableOpacity>
        </View> */}
        <View style={{marginTop: 'auto', alignSelf: 'center'}}>
          <VectorIcon
            type="Entypo"
            name="location"
            size={150}
            color={'#FFFFFF'}
            onPress={() => console.log('')}
          />
        </View>
        <TouchableOpacity style={[styles.uploadbtn, {marginTop: 'auto'}]}>
          <Text style={styles.uploadbtntxt}>Click To Open Maps</Text>
        </TouchableOpacity>
      </View>
      {/* 
      <View style={styles.locview}>
        <View style={styles.lineloc}></View>
        <Text style={styles.locor}>OR</Text>
        <View style={styles.lineloc}></View>
      </View> */}

      {/* <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#F9F9F9"
        // onChangeText={}
        // value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        placeholderTextColor="#F9F9F9"
        // onChangeText={}
        // value={email}
      /> */}
      <TouchableOpacity
        style={[styles.loginButton, {marginTop: 'auto'}]}
        onPress={() => setPage(page + 1)}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  const Basic = () => {
    const handleNext = () => {
      console.log(data);
      setformData({...formData, ...data});
      schema
        .validate(data)
        .then(() => setPage(page + 1))
        .catch(err => console.log(err));
    };
    const [data, setData] = useState({
      name: formData.name,
      phone: formData.phone,
      country: formData.country,
      email: formData.email,
      agreed: formData.agreed,
      logo: formData.logo,
    });
    const schema = yup.object().shape({
      country: yup.string().required('Country is required'),
      logo: yup.mixed().required('logo is required'),
      email: yup
        .string()
        .required('Email is required')
        .email('Invalid email address'),
      phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
      name: yup.string().required('Business name is required'),
      agreed: yup
        .boolean()
        .oneOf([true], 'You must agree to the terms and conditions'),
    });

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {formData.logo ? (
          <TouchableOpacity
            style={styles.upload}
            activeOpacity={0.8}
            onPress={() => pickImage('logo')}>
            <Image
              source={{uri: formData.logo.uri}}
              style={{width: 150, height: 150, borderRadius: 10, marginTop: 10}}
            />
            <Text style={{color: '#fff'}}>{formData.logo.fileName}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.upload}
            activeOpacity={0.8}
            onPress={() => pickImage('logo')}>
            <View style={styles.innerup}>
              <Imports.images.UploadBusiness style={{margin: '2%'}} />
              <Text style={styles.buttonWText}>Upload your Business logo</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={{marginVertical: '3%'}}>
          <TextInput
            style={styles.input}
            placeholder="Business Name"
            placeholderTextColor="#F9F9F9"
            onChangeText={text => setData({...data, name: text})}
            value={data.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#F9F9F9"
            onChangeText={text => setData({...data, phone: text})}
            value={data.phone}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#F9F9F9"
            onChangeText={text => setData({...data, email: text})}
            value={data.email}
            keyboardType="email-address"
          />
          <View style={styles.iconInput}>
            <Dropdown
              propsData={[
                {title: 'Canada', value: 'canada'},
                {title: 'India', value: 'india'},
              ]}
              title="State,Province or region"
              setValue={selectedValue =>
                setData({...data, country: selectedValue})
              }
              value={data.country}
            />
            <VectorIcon
              style={styles.floatingIcon}
              type="Entypo"
              name="chevron-down"
              color={colors.text}
              size={25}
            />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setData({...data, agreed: !data.agreed})}
            style={styles.checkboxContainer}>
            <View
              style={[
                styles.checkbox,
                {backgroundColor: data.agreed ? '#3F9469' : colors.light_gray},
              ]}
            />
            <Text style={styles.checkboxLabel}>
              I agree to the Terms & Conditions and Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.loginButton}
            onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const SetVerification = () => (
    <ScrollView style={styles.verifylayout}>
      <Text style={styles.textverify}>Business Registration Number</Text>
      <TextInput
        style={[styles.input, styles.verifyinput0]}
        placeholder="Enter Number*"
        placeholderTextColor="#F9F9F9"
        // onChangeText={}
        // value={email}
      />
      <Spacer />

      <Text style={styles.textverify}>
        Upload Business Verification Document
      </Text>
      <View
        style={[styles.input, styles.verifyinput]}

        // onChangeText={}
        // value={email}
      >
        <VectorIcon
          type="Entypo"
          name="upload-to-cloud"
          size={26}
          color={'#FFFFFF'}
          onPress={() => console.log('')}
        />

        <Text style={styles.uploadtext}>Upload</Text>
      </View>

      <TouchableOpacity style={styles.verifyimg}>
        <View style={styles.verifyimglay}>
          <Imports.images.UploadBusiness style={{margin: '2%'}} />
          <Text style={styles.buttonWText}>Upload Your Store Picture</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.loginButton, {width: '95%'}]}
        onPress={() => setPage(page + 1)}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const Review = () => (
    <ScrollView>
      <View style={styles.reviewbox}>
        <Image
          source={require('../assets/images/category.png')}
          style={styles.reviewimg}
          resizeMode="contain"></Image>
      </View>

      <View style={{padding: 15}}>
        <Text style={styles.reviewtextbold}>Business Name</Text>
        <Text style={styles.reviewtextlight}>Walmart</Text>

        <Text style={styles.reviewtextbold}>Phone</Text>
        <Text style={styles.reviewtextlight}>+1 123 555 0000</Text>

        <Text style={styles.reviewtextbold}>Business Email</Text>
        <Text style={styles.reviewtextlight}>info@walmart.com</Text>

        <Text style={styles.reviewtextbold}>Address</Text>
        <Text style={styles.reviewtextlight}>720 Mill Street{'\n'}N2M 098</Text>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => setPage(page + 1)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const VerificationStatus = () => (
    <View style={styles.flx1}>
      <Image
        source={require('../assets/images/Ellipse1.png')}
        style={{
          position: 'absolute',
          bottom: 50,
          right: 0,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/Ellipse2.png')}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 120,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/Ellipse3.png')}
        style={{
          position: 'absolute',
          bottom: 0,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/Ellipse4.png')}
        style={{
          position: 'absolute',
          right: 0,
        }}
        resizeMode="contain"
      />
      <View style={styles.bigcircle}>
        <VectorIcon
          type="FontAwesome"
          name="check"
          size={60}
          color={'#FFFFFF'}
        />
      </View>
      <Text style={styles.infotext}>
        {true
          ? 'Business Details and Document submitted.'
          : 'Your account has been successfully verified.'}
      </Text>

      {true ? (
        <TouchableOpacity style={styles.buttondash}>
          <Text style={styles.viewdashtext}>View Dashboard</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.pendingtext}>Pending approval</Text>
      )}
    </View>
  );

  const renderPageContent = () => {
    switch (page) {
      case 1:
        return <Basic />;
      case 2:
        return <SetLocation />;
      case 3:
        return <SetVerification />;
      case 4:
        return <Review />;
      case 5:
        return <VerificationStatus />;
    }
  };

  return (
    <Container
      style={[[styles.container, {backgroundColor: colors.background}]]}>
      <View style={styles.bar}>
        <VectorIcon
          type="Ionicons"
          name="chevron-back"
          size={30}
          color={'#000000'}
          onPress={() => setPage(page > 1 ? page - 1 : 1)}
        />
        <Text style={[styles.heading, {color: colors.dark_black}]}>
          {page > 1 ? 'Setup Business' : 'Create Business'}
        </Text>

        <VectorIcon
          type="AntDesign"
          name="close"
          size={27}
          color={'#000000'}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.contflex}>
        {nums.map((data: any, index) => {
          const key = Object.keys(data)[0];
          const value = data[key];
          return (
            <View
              key={index}
              // style={{flexDirection: 'column', alignItems: 'center'}}
            >
              <View style={styles.flexd}>
                <View
                  style={[
                    styles.prcircle,
                    index + 1 < page
                      ? {backgroundColor: '#EE5635'}
                      : page == index + 1
                      ? {backgroundColor: '#EE5635'}
                      : {borderColor: '#EE5635', borderWidth: 1.5},
                  ]}>
                  {index + 1 >= page ? (
                    <Text style={styles.whitetext}>{key}</Text>
                  ) : (
                    <VectorIcon
                      type="FontAwesome"
                      name="check"
                      size={25}
                      color={'#FFFFFF'}
                    />
                  )}
                </View>
                {/* Line between circles */}
                {index < nums.length - 1 && <View style={styles.line} />}
              </View>
              <Text
                style={{
                  ...styles.val,
                  right: index + 1 === 2 ? 5 : index + 1 === 3 ? 10 : 0,
                }}>
                {value}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Screens Progress */}
      {renderPageContent()}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    width: '100%',
  },
  bar: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
  },
  orangebar: {
    width: '100%',
    backgroundColor: '#EE5635',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
  },
  contflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
  },
  reviewbox: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewimg: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 20,
  },
  reviewtextbold: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    color: '#fff',
  },
  reviewtextlight: {
    fontSize: 18,
    fontWeight: '300',
    lineHeight: 26,
    color: '#F9F9F9',
    marginTop: 5,
    marginBottom: 20,
  },
  flexd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flx1: {flex: 1, alignItems: 'center'},
  val: {
    alignSelf: 'stretch',
    marginVertical: 5,
    position: 'relative',
  },
  infotext: {
    marginVertical: '6%',
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 27,
  },
  bigcircle: {
    marginTop: '20%',
    height: 120,
    width: 120,
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EE5635',
  },
  buttondash: {backgroundColor: '#000000', borderRadius: 50},
  viewdashtext: {
    marginHorizontal: '4%',
    marginVertical: '3%',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  pendingtext: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EE5C74',
    lineHeight: 27,
  },
  prcircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whitetext: {
    fontSize: 22,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  line: {
    height: 1,
    width: 50,
    backgroundColor: '#EE5635',
  },
  input: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 50,
    height: 56,
    borderColor: '#F9F9F9',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 18,
    backgroundColor: '#FFFFFF00',
    color: '#FFFFFF',
  },
  heading: {
    fontWeight: '400',
    fontSize: 22,
    fontFamily: 'Arial',
  },
  loginButton: {
    width: '90%',
    alignSelf: 'center',
    height: 56,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 30,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  buttonWText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },

  buttonTText: {
    marginHorizontal: '10%',
    fontSize: 14,
    marginVertical: '1%',
    // lineHeight: 21,
    fontWeight: '400',
    color: '#F2F2F2',
  },
  verifylayout: {
    alignSelf: 'center',
    width: '85%',
  },
  textverify: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9F9F9',
    lineHeight: 30,
  },
  uploadtext: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24,
    color: '#FFFFFF',
    marginHorizontal: '2%',
  },
  verifyimg: {
    width: '100%',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    alignSelf: 'center',
    margin: '10%',
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyimglay: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10%',
  },
  verifyinput0: {
    borderRadius: 5,
    alignSelf: 'flex-start',
    width: '100%',
  },
  gpstext: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    alignSelf: 'center',
  },
  uploadbtn: {
    backgroundColor: '#EE5635',
    borderRadius: 5,

    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
  },
  uploadbtntxt: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22.5,
  },
  locview: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: '5%',
    alignSelf: 'center',
  },
  locor: {marginHorizontal: '3%', fontSize: 16, fontWeight: '400'},
  lineloc: {borderColor: '#18191C', borderWidth: 2, width: '45%'},
  uploadbtn2: {
    backgroundColor: '#EE5635',
    borderRadius: 5,
    margin: 10,
    marginHorizontal: '11%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
  },
  verifyinput: {
    marginTop: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  iconInput: {
    position: 'relative',
    alignSelf: 'center',
  },
  floatingIcon: {
    position: 'absolute',
    right: 10,
    top: 25,
  },
  whitebox: {
    width: '80%',
    borderColor: '#F9F9F9',
    borderWidth: 1,
    alignSelf: 'center',
    margin: 15,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wbox: {
    width: '90%',
    borderColor: '#F9F9F9',
    borderWidth: 1,
    alignSelf: 'center',
    margin: 15,
    borderRadius: 5,
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
    height: 41,
    borderColor: '#F9F9F9',
    borderWidth: 1,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '4%',
    // paddingLeft: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    width: '80%',
    color: '#FFF',
    lineHeight: 23,
  },
  upload: {
    width: '90%',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    alignSelf: 'center',
    margin: 15,
    borderRadius: 8,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerup: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10%',
  },
});
export default CreateBusiness;
