//ReviewScreen.js <리뷰 작성>
import React from 'react';
import {
  Modal,
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
const ReviewScreen = () => {
  const [myHistoryList, setMyHistoryList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [starRating, setStarRating] = useState(0);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(storedUserId => {
      if (storedUserId) {
        setUserId(storedUserId);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'http://ceprj.gachon.ac.kr:60005/user/history',
          {ID: userId},
        );
        setMyHistoryList(response.data.data.useLogs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  //별점 매기기 모달창
  const openModal = item => {
    setSelectedItem(item);
    setStarRating(item.rating || 0);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };
  const handleRating = async () => {
    try {
      // 서버에 평가 정보 전송
      await axios.post('http://ceprj.gachon.ac.kr:60005/user/rating', {
        USE_NAME: selectedItem.USE_NAME,
        RATING: starRating,
      });
      // 서버 전송이 성공하면 해당 항목을 화면에서 제거
      setMyHistoryList(prevList =>
        prevList.filter(item => item.USE_ID !== selectedItem.USE_ID),
      );
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      closeModal();
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.USE_NAME}</Text>
        <Text style={styles.itemText}>{item.USE_DATE}</Text>
      </View>
      <TouchableOpacity
        style={styles.starContainer}
        onPress={() => openModal(item)}>
        <Text style={styles.starBtn}>별점</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#b3289d" />
      ) : (
        <FlatList
          data={myHistoryList}
          keyExtractor={item => item.USE_ID.toString()}
          renderItem={renderItem}
        />
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>별점 매기기</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={starRating}
              selectedStar={rating => setStarRating(rating)}
              fullStarColor={'#be289d'}
              halfStarEnabled={true}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 30,
              }}>
              <TouchableOpacity onPress={handleRating} style={styles.modalBtn}>
                <Text style={styles.modalText}>확인</Text>
              </TouchableOpacity>
              <View style={{marginHorizontal: 5}} />
              <TouchableOpacity onPress={closeModal} style={styles.modalBtn}>
                <Text style={styles.modalText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomColor: '#ccc',
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
  },
  starContainer: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#be289d',
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  starBtn: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#be289d',
    width: 60,
    height: 35,
    borderRadius: 5,
  },
  modalText: {color: '#fff'},
});

export default ReviewScreen;
