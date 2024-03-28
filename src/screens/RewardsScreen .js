import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity,Alert } from 'react-native';
import NFTCard from '../components/reward/NFTCard';
import RewardHeader from '../components/reward/ReawardHeader';
import axios from 'react-native-axios'

const RewardsScreen = () => {
  const points = 75;
  const [nfts, setNfts] = useState([]);
  const xKey = "2neS76iK3K9IVD5y"; // Thay thế bằng x-api-key chịu phí
  const adminWallID = "5wbGvpCsCznhoRCxWaJaJbtaXsiph55rQPGR7LBKaQe2"; // Địa chỉ ví Admin chứa NFTs
  const toAddress = "CfHt2GWCKmPJFfmWxishL2ERxbDkTioqX2E4pBNZzs3H";// Địa chỉ ví người dùng nhận NFT sẽ lấy từ account info
  const network = "devnet"; // Sử dụng mạng devnet

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${adminWallID}`;
        const response = await axios.get(nftUrl, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xKey,
          },
        }); 
        const nftData = response.data.result.map((item) => ({
          id: item.mint,
          name: item.name,
          points: 100, // Giả sử mỗi NFT cần 100 điểm
          imageUri: { uri: item.image_uri },
        }));
        setNfts(nftData);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Unable to fetch NFTs");
      }
    };

    fetchNFTs();
  }, []);

  const transferNFT = async (tokenAddress, adminWallID, toAddress) => {
    console.log(`Transferring NFT with tokenAddress: ${tokenAddress}`);
    const transferUrl = "https://api.shyft.to/sol/v1/nft/transfer_detach";
    const data = JSON.stringify({
      network: "devnet",
      token_address: tokenAddress,
      from_address: adminWallID,
      to_address: toAddress,
      transfer_authority: true,
      fee_payer: adminWallID, 
    });
  
    try {
      const response = await axios.post(transferUrl, data, {
        headers: {
          "x-api-key": xKey,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      Alert.alert("Success", "NFT transferred successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to transfer NFT");
    }
  };
  

  const renderNFTCard = ({ item }) => (
    <NFTCard
      name={item.name}
      points={item.points}
      imageUri={item.imageUri}
      onPress={() => console.log('NFT pressed', item.id)}
      onTransferPress={() => transferNFT(item.id, adminWallID, toAddress)}
    />
  );
  
  

  return (
    <View style={styles.container}>
      <RewardHeader points={points} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Quà tặng</Text>
        <TouchableOpacity onPress={() => console.log('View all pressed')}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerSubtitle}>Tích điểm đổi quà NFTs</Text>

      <FlatList
        data={nfts}
        renderItem={renderNFTCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  viewAllText: {
    fontSize: 16,
    color: '#d1bcff',
    textDecorationLine: 'underline',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerSubtitle: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
});

export default RewardsScreen;
