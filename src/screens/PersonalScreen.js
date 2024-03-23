import React, {useEffect, useState} from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState('');;
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('userId').then(response => {
        console.log(response);
        setUserId(response);
        
    })
    fetch('http://192.168.1.109:3001/api/nguoi-dung/' + userId, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }).then(response => {
      return response.json();
    }).then(json => {
        if(json.data){
          setUser(json.data)
        }
    })
  }, [userId])


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 , marginVertical: 'auto'}}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
              color:'#fff'
            }]}>{user.fullname}</Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>

        <View style={styles.row}>
          <Icon name="phone" color="#d1bcff" size={20} />
          <Text style={{ color: "#d1bcff", marginLeft: 20 }}>{user.email}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#d1bcff" size={20} />
          <Text style={{ color: "#d1bcff", marginLeft: 20 }}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox]}>
          <Title style={styles.titleSol}>140</Title>
          <Caption>SOL</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="account-edit" color="#d1bcff" size={25} />
            <Text style={styles.menuItemText}>Chỉnh sửa hồ sơ</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#d1bcff" size={25} />
            <Text style={styles.menuItemText}>Hỗ trợ</Text>
          </View>
        </TouchableRipple>

        <TouchableOpacity style={styles.commandButton} onPress={() => {navigation.navigate('Login') }}>
          <Text style={styles.panelButtonTitle}>Đăng Xuất</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1b20'
                  
    
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  titleSol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d1bcff'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    borderTopColor: '#fff',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#fff',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#d1bcff',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 30
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  }
});