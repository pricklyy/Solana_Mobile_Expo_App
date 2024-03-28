import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React ,{useState,useContext}from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';


const ChiTietScreen = ({ route }) => {
    const navigation = useNavigation();
    const { item } = route.params || {};

    // const { nhanNhiemVu } = useContext(NhiemVuContext);

    const [showLottie, setShowLottie] = useState(false);

    const goToStatus = (status) => {
        setShowLottie(true);
        // nhanNhiemVu(item);
        // Set a timeout to navigate to Status Screen after 2 seconds
        setTimeout(() => {
          setShowLottie(false);
          navigation.navigate('Doing');
        }, 2000);
      };

      

    //   useFocusEffect(
    //     React.useCallback(()=> {
    //         console.log('Refreshing...');
    //     },[])
    //   )
      
    return (
        <View>
          
          <Text style={styles.textMission}>{item && item.tenNV}</Text>
            <Text style={styles.textcc}>Mức độ: {item&&item.level}</Text>
            <Text style={styles.textcc}>Thưởng: {item&&item.point} <Image
          source={require('../../assets/diem.png')}/></Text>
            <Text style={styles.textcc}>Mô tả: {item&&item.moTa}</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={goToStatus}>
            <Text style={styles.textbutton}>Nhận</Text>
            </TouchableOpacity>
            
            {showLottie && (
        <LottieView
          source={require('../../assets/done.json')}
          autoPlay
          loop={false} style={styles.lottie}
        />
      )}
        </View>
        </View>
        
    )
}

export default ChiTietScreen

const styles = StyleSheet.create({
    
    textMission: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 10,
        color : '#fff'
    },
    textcc: {
        marginLeft: 15,
        fontSize: 15,
        color : '#fff'
    },
    button : {
        backgroundColor: '#d1bcff',
        width:100,
        height: 40,
        borderRadius : 20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:140,
        marginTop: 20,
    },
    textbutton : {
        color:'#fff',
        fontWeight:'bold',
        fontSize:15,
    },
    lottie : {
        width: 200,
        height: 200,
        
    },
    circle: {
      width: 200,
      height: 200,
      right:20,
      borderRadius: 100,
      backgroundColor: '#0094ff',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    circle1 : {
      width: 150,
      height: 150,
      borderRadius: 100,
      left: 100,
      bottom:50,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    }

})