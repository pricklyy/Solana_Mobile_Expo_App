import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, ToastAndroid } from 'react-native'
import { isValidEmail, isValidHoTen, isValidPassword, isValidfullname } from '../../validate/Validations'
import axios from 'react-native-axios';


const REGISTER_API = 'http://192.168.1.109:3001/api/nguoi-dung/dang-ky'

const Register = (props) => {
    const { navigation, route } = props;

    //validate
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorHoTen, setErrorHoTen] = useState('')
    const [errorFullName, seterrorFullName] = useState('')

    //states email pass
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setrePassword] = useState('')
    const [hoTen, sethoTen] = useState('')
    const [users, setUsers] = useState([])
    const [fullname, setfullname] = useState('')

    const isValidationOK = () => email.length > 0 && password.length > 0 && hoTen.length > 0 && fullname.length > 0
        && isValidEmail(email) == true
        && isValidPassword(password) == true
        && isValidHoTen(hoTen) == true
        && isValidfullname(fullname) == true
        


    const handleRegister = async () => {
        try {
            const randomNumber = Math.floor(Math.random() * 10000000000);
            const randomString = Math.random().toString(36).substring(7);

            const response = await fetch(REGISTER_API, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: hoTen,
                    fullname: fullname,
                    // numberPhone: randomNumber,
                    // xKey: randomString,
                    // wallID: randomString
                }),
            });

            console.log('response: ' + response.password)

            if (!response.ok) {
                const message = `An error has occurred: ${response.status}`;
                ToastAndroid.show(message, ToastAndroid.LONG);
                console.error(message);
                return;
            }

            if (response.status === 200) {
                console.log("response: " + response.status);
                ToastAndroid.show('Đăng ký thành công', ToastAndroid.LONG);
                navigation.replace('Login');

                return;
            }

        } catch (e) {
            console.error(e);
            ToastAndroid.show('An error occurred.', ToastAndroid.LONG);
        }
    }

    return (
        <ScrollView>
            <View
                style={{
                    flexDirection: 'row',
                    height: 230
                }}>

                <View
                    style={{
                        height: 150,
                        width: 150,
                        backgroundColor: '#5daef2',
                        borderRadius: 750,
                        top: -75,
                        left: 150
                    }} />
                <View
                    style={{
                        height: 300,
                        width: 300,
                        backgroundColor: '#0d0dd9',
                        borderRadius: 150,
                        top: -100,
                        left: -200
                    }}>
                    <Text
                        style={[styles.txt, {
                            top: 150,
                            left: 60,
                            color: 'white'
                        }]}>Tạo,{'\n'}     Tài Khoản</Text>
                </View>
                <TouchableOpacity>
                    <Image
                        onPress={() => navigation.goback()}
                        style={{
                            width: 50,
                            height: 50,
                            right: 150,
                            top: 30,
                            tintColor: 'blue'
                        }} source={require('../../assets/back.png')} />
                </TouchableOpacity>


            </View>

            {/* View textinput tài khoản mật khẩu */}
            <View
                style={{
                    flex: 2,
                }}>
                     <Text
                    style={styles.txt}>Full Name</Text>
                <TextInput
                    onChangeText={(text) => {
                        seterrorFullName(isValidfullname(text) == true ? '' : '* Nhập đầy đủ họ tên')
                        setfullname(text)
                    }}
                    style={[styles.txtInput]}
                    placeholder='Nhập đầy đủ họ tên' />
                <Text
                    style={{
                        marginLeft: 10,
                        color: 'red',
                        marginBottom: 5
                    }}>{errorFullName}</Text>

                <Text
                    style={styles.txt}>Họ Tên</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorHoTen(isValidHoTen(text) == true ? '' : '* Nhập đầy đủ họ tên')
                        sethoTen(text)
                    }}
                    style={[styles.txtInput]}
                    placeholder='Nhập họ tên' />
                <Text
                    style={{
                        marginLeft: 10,
                        color: 'red',
                        marginBottom: 5
                    }}>{errorHoTen}</Text>
                <Text
                    style={styles.txt}>Tài Khoản</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorEmail(isValidEmail(text) == true ? '' :
                            '* Tài khoản phải là email')
                        setEmail(text)
                    }}
                    style={styles.txtInput}
                    placeholder='example@gmail.com' />
                <Text
                    style={{
                        marginLeft: 10,
                        color: 'red'
                    }}>{errorEmail}</Text>

                <Text style={[styles.txt, { marginTop: 5 }]}>Mật khẩu</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorPassword(isValidPassword(text) == true ? '' :
                            '* Mật khẩu phải có 6 ký tự')
                        setPassword(text)
                    }}
                    style={styles.txtInput}
                    secureTextEntry={true}
                    placeholder='Mật khẩu có 6 kí tự trở lên' />
                <Text
                    style={{
                        color: 'red',
                        marginLeft: 10,
                    }}>{errorPassword}</Text>
                <Text
                    style={styles.txt}>Nhập lại mật khẩu</Text>
                <TextInput
                    onChangeText={(text) => setrePassword(text)}
                    style={[styles.txtInput]}
                    secureTextEntry={true}
                    placeholder='Enter your re-password' />
                <TouchableOpacity
                    onPress={() => {
                        if (password !== rePassword) {
                            alert('Vui lòng kiểm tra lại mật khẩu')
                        } else {

                            handleRegister()
                        }
                    }}
                    disabled={isValidationOK() == false}
                    style={[styles.btnLogin, {
                        backgroundColor: isValidationOK() == true ? 'blue' : 'rgba(0,0,0,0.5)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30,
                        borderRadius: 15
                    }]}>
                    <Text style={[styles.txt,
                    {
                        fontSize: 24,
                        marginRight: 10,
                        color: 'white',
                    }
                    ]}>Đăng Ký</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    txtInput: {
        borderWidth: 2,
        marginHorizontal: 10,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        color:'#fff'
    },
    txt: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
        color:'#fff'
    },
    btnLogin: {
        margin: 10,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10
    }
});
