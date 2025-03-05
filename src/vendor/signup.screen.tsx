import React, {FC, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Container from './../components/hoc/container.hoc';
import Imports from './../assets/imports.assets';
import TextInput from './../components/ui/text_input/text_input.ui';
import {useTheme} from '@react-navigation/native';
import Text from './../components/ui/text/text.ui';
// import DropDownPicker from 'react-native-dropdown-picker';
import VectorIcon from './../components/ui/vector_icon/vector_icon';
import RNPickerSelect from 'react-native-picker-select';
import Dropdown from './../components/ui/select_dropdown/select_dropdown.ui';
import {VENDOR_ROUTES} from '../utils/route_names.util';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as yup from 'yup';
import {vendorRegistration} from '../api/functions/auth';
import {useAuthContext} from '../api/authContext';
const VendorSignUp: FC<any> = ({navigation}) => {
  const [name, setName] = useState('Salsaal');
  const [email, setEmail] = useState('salsaal@gmail.com');
  const [phone, setPhone] = useState('1234567890');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('Something');
  const [building, setBuilding] = useState('');
  const [zipcode, setZipcode] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('1234567890');
  const [confirmPassword, setConfirmPassword] = useState('1234567890');
  const {colors} = useTheme();
  const [agreed, setAgreed] = useState(false); // Step 1: State for checkbox
  const [loading, setloading] = useState(false);
  const handleCheckboxChange = () => {
    setAgreed(!agreed); // Step 2: Toggle checkbox state
  };
  const {setUser} = useAuthContext();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      paddingTop: useSafeAreaInsets().top + 5,
    },
    contentContainer: {},
    heading: {
      fontWeight: '700',
      fontSize: 35,
      lineHeight: 50,
      fontFamily: 'Arial',
      color: '#FFF',
      padding: 30,
      paddingTop: 0,
      paddingVertical: 10,
      textAlign: 'left',
    },
    input: {
      width: Dimensions.get('window').width - 50,
      height: 56,
      borderColor: '#F9F9F9',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      fontSize: 18,
      backgroundColor: '#FFFFFF00',
      color: '#FFFFFF', // Change text color
    },
    loginButton: {
      width: Dimensions.get('window').width - 50,
      height: 56,
      backgroundColor: '#F9F9F9',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 10,
    },
    buttonText: {
      fontSize: 18,
      color: '#000000',
      textAlign: 'center',
    },
    forgotPassword: {
      fontSize: 16,
      color: '#EE5635',
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 30,
      alignSelf: 'flex-start',
    },
    noAccount: {
      fontSize: 16,
      color: colors.vendorPrimary,
      paddingTop: 5,
      paddingLeft: 30,
      alignSelf: 'flex-start',
    },
    createAccount: {
      fontSize: 16,
      color: '#FFF',
      paddingTop: 5,
      paddingLeft: 30,
      alignSelf: 'flex-start',
    },

    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      width: '80%',
      backgroundColor: '#FFFFFF',
    },
    dividerText: {
      color: '#FFFFFF',
      marginHorizontal: 10,
    },
    socialIconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    socialIcon: {
      marginLeft: 5,
      padding: 15,
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: 'center',
      alignItems: 'center',
    },

    LoginBottom: {
      top: '20%',
      right: 0,
      alignSelf: 'flex-end',
    },
    noAccountContainers: {
      paddingVertical: 40,
      alignSelf: 'flex-start',
    },
    customDropDown: {
      width: Dimensions.get('window').width - 50,
      height: 56,
      borderColor: '#F9F9F9',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      fontSize: 18,
      alignSelf: 'center',
      margin: 10,
      color: colors.text,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
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
    iconInput: {
      position: 'relative',
    },
    floatingIcon: {
      position: 'absolute',
      right: 10,
      top: 25,
    },
  });
  const handleSignUp = async () => {
    schema
      .validate({
        name,
        phone,
        email,
        country,
        city,
        state,
        address,
        zipcode,
        password,
        confirmPassword,
        agreed,
      })
      .then(async valid => {
        if (valid) {
          setloading(true);
          const res = await vendorRegistration({
            full_name: name,
            phone,
            email,
            country,
            city,
            state,
            address,
            pin: zipcode,
            password,
            confirm_password: confirmPassword,
          });
          if (res) {
            navigation.navigate(VENDOR_ROUTES.Login);
            // setUser(res.vendor);
          }
          setloading(false);
        }
      })
      .catch(err => console.log(err));
  };
  let schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    phone: yup
      .number()
      .typeError('Phone number must be a valid number')
      .required('Phone number is required')
      .positive('Phone number must be positive')
      .integer('Phone number must be an integer'),
    email: yup
      .string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    address: yup.string().required('Address is required'),
    building: yup.string(),
    zipcode: yup.string().required('Zipcode is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    agreed: yup
      .boolean()
      .oneOf([true], 'You must agree to the terms and conditions'),
  });

  return (
    <Container style={styles.container}>
      <Imports.images.SignUpTop
        style={{position: 'absolute', top: 0, right: 0, zIndex: -1}}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.heading}>Registration</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.input}
              placeholder="Full Name*"
              placeholderTextColor="#F9F9F9"
              onChangeText={setName}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone*"
              placeholderTextColor="#F9F9F9"
              onChangeText={setPhone}
              value={phone}
            />
            <TextInput
              style={styles.input}
              placeholder="Email*"
              placeholderTextColor="#F9F9F9"
              onChangeText={setEmail}
              value={email}
            />
            <View style={styles.iconInput}>
              <Dropdown
                propsData={[
                  {title: 'Canada', value: 'canada'},
                  {title: 'India', value: 'india'},
                ]}
                title="Country*"
                setValue={selectedValue => setCountry(selectedValue)}
              />
              <VectorIcon
                style={styles.floatingIcon}
                type="Entypo"
                name="chevron-down"
                color={colors.text}
                size={25}
              />
            </View>
            <View style={styles.iconInput}>
              <Dropdown
                propsData={[
                  {title: 'Canada', value: 'canada'},
                  {title: 'India', value: 'india'},
                ]}
                title="State,Province or region"
                setValue={selectedValue => setState(selectedValue)}
              />
              <VectorIcon
                style={styles.floatingIcon}
                type="Entypo"
                name="chevron-down"
                color={colors.text}
                size={25}
              />
            </View>
            <View style={styles.iconInput}>
              <Dropdown
                propsData={[
                  {title: 'Canada', value: 'canada'},
                  {title: 'India', value: 'india'},
                ]}
                title="City*"
                setValue={selectedValue => setCity(selectedValue)}
              />
              <VectorIcon
                style={styles.floatingIcon}
                type="Entypo"
                name="chevron-down"
                color={colors.text}
                size={25}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#F9F9F9"
              onChangeText={setAddress}
              value={address}
            />
            <TextInput
              style={styles.input}
              placeholder="Postal/Zip Code*"
              placeholderTextColor="#F9F9F9"
              onChangeText={setZipcode}
              value={zipcode}
            />
            <View style={styles.iconInput}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#F9F9F9"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.floatingIcon}>
                <VectorIcon
                  type="Entypo"
                  name={showPassword ? 'eye-with-line' : 'eye'}
                  color={colors.text}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.iconInput}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#F9F9F9"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry={showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.floatingIcon}>
                <VectorIcon
                  type="Entypo"
                  name={showConfirmPassword ? 'eye-with-line' : 'eye'}
                  color={colors.text}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            {/* Checkbox */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleCheckboxChange}
              style={styles.checkboxContainer}>
              <View
                style={[
                  styles.checkbox,
                  {backgroundColor: agreed ? '#3F9469' : colors.light_gray},
                ]}
              />
              <Text style={styles.checkboxLabel}>
                I agree to the Terms & Conditions and Privacy Policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              disabled={loading}
              onPress={handleSignUp}>
              <Text style={styles.buttonText}>
                {loading ? 'Signing' : 'Signup'}
              </Text>
            </TouchableOpacity>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>
            <View style={styles.socialIconsContainer}>
              <TouchableOpacity style={styles.socialIcon}>
                <Imports.images.Google style={{width: 42, height: 42}} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Imports.images.Facebook style={{width: 42, height: 42}} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Imports.images.Apple style={{width: 42, height: 42}} />
              </TouchableOpacity>
            </View>
            <View style={styles.noAccountContainers}>
              <Text style={styles.noAccount}>Alerady have an account ?</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate(VENDOR_ROUTES.Login)}>
                <Text style={styles.createAccount}>
                  Sign In to your account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Imports.images.LoginBottom style={styles.LoginBottom} /> */}
      </ScrollView>
    </Container>
  );
};

export default VendorSignUp;
