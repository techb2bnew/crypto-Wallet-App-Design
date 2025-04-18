import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInputComponent from '../component/TextInputComponent';
import ButtonComponent from '../component/ButtonComponent';
import PhoneInput from 'react-native-phone-number-input';
import { blackColor, BlueColor, grayColor, lightBlueColor, whiteColor } from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { style, spacings } from '../constants/Fonts';
import { ALREADY_HAVE_ACCOUNT, CONFIRM_PASSWORD, EMAIL, LOGIN, OR_CONTINUE_WITH, PASSWORD, SIGN_UP, USERNAME } from '../constants/Constants';
import { GOOGLE_LOGO_IMAGE } from '../assests/images';
const { flex, alignItemsCenter, alignJustifyCenter, resizeModeContain, flexDirectionRow, justifyContentSpaceBetween, textAlign } = BaseStyle;

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const phoneInput = React.useRef(null);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let newErrors = {};

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = "Invalid email address";
    }
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateFields()) {
      console.log("Sign Up Successful", { email, username, phone, password });
      // Proceed with API call or navigation
    }
  };

  return (
    <LinearGradient colors={[BlueColor, lightBlueColor, whiteColor, whiteColor]} style={[flex, alignJustifyCenter]}>
      <View style={[styles.container, alignJustifyCenter]}>
        <View style={[styles.logoContainer, alignJustifyCenter]}>
          <Text style={styles.title}>{SIGN_UP}</Text>
        </View>
        <TextInputComponent
          label={EMAIL}
          value={email}
          setValue={(text) => {
            setEmail(text);
            setErrors({ ...errors, email: '' });
          }}
          style={styles.input}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInputComponent
          label={USERNAME}
          value={username}
          setValue={(text) => {
            setUsername(text);
            setErrors({ ...errors, username: '' });
          }}
          style={styles.input} />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

        <PhoneInput
          ref={phoneInput}
          defaultValue={phone}
          defaultCode="IN"
          layout="second"
          onChangeText={(text) => {
            setPhone(text);
            setErrors({ ...errors, phone: '' });
          }}
          textInputProps={{
            maxLength: 10,
            keyboardType: "numeric",
          }}
          containerStyle={styles.phoneInputContainer}
          textContainerStyle={styles.phoneInputTextContainer}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <TextInputComponent
          label={PASSWORD}
          value={password}
          setValue={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
          secureTextEntry
          style={styles.input} />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TextInputComponent
          label={CONFIRM_PASSWORD}
          value={confirmPassword}
          setValue={(text) => {
            setConfirmPassword(text);
            setErrors({ ...errors, confirmPassword: '' });
          }}
          secureTextEntry
          style={styles.input} />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <ButtonComponent title={SIGN_UP} onPress={handleSignUp} style={styles.button} />
        <Text style={styles.orText}>{OR_CONTINUE_WITH}</Text>
        <View style={[styles.socialContainer, flexDirectionRow, justifyContentSpaceBetween]}>
          <TouchableOpacity style={[{ width: wp(10), height: hp(5) }, alignJustifyCenter]}>
            <Image source={GOOGLE_LOGO_IMAGE} style={[{ width: wp(8), height: hp(4) }, resizeModeContain]} />
          </TouchableOpacity>
          <TouchableOpacity style={[{ width: wp(10), height: hp(5) }, alignJustifyCenter]}>
            <FontAwesome name="facebook" size={30} color="#3C5997" />
          </TouchableOpacity>
          <TouchableOpacity style={[{ width: wp(11), height: hp(5) }, alignJustifyCenter]}>
            <FontAwesome name="twitter" size={30} color="skyblue" />
          </TouchableOpacity>
        </View>

      </View>
      <View style={{ width: "85%", alignItems: "center", justifyContent: "center", height: hp(10), marginBottom: hp(3) }}>
        <Text style={styles.loginText}>{ALREADY_HAVE_ACCOUNT}</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>{LOGIN}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 20,
    borderRadius: 20,
  },
  logoContainer: {
    height: hp(11),
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: whiteColor,
  },
  input: {
    width: '100%',
    height: hp(5),
    borderRadius: 10,
    backgroundColor: whiteColor,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: Platform.OS === "android" ? hp(5) : hp(4.5),
    borderRadius: 15,
    backgroundColor: lightBlueColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  orText: {
    marginVertical: 30,
    fontSize: 16,
    color: grayColor,
  },
  socialContainer: {
    width: '60%',
    marginBottom: 20,
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: blackColor
  },
  buttonText: {
    color: BlueColor,
    fontSize: 18,
  },
  phoneInputContainer: {
    width: '100%',
    height: hp(5.2),
    marginTop: 15,
    borderRadius: 15
  },
  phoneInputTextContainer: {
    paddingVertical: 0,
    borderRadius: 15,
    height: hp(5.3)
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    // marginBottom: 10,
  },
});

export default SignUpScreen;
