import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

class BluetoothScanner extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      devices: [], // 스캔된 디바이스 목록
      connectedDevice: null, // 연결된 디바이스
    };
  }

  componentDidMount() {
    // 블루투스 스캐너 활성화
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Error while scanning!!!!!!!!!!!!:', error);
        return;
      }

      // 중복된 디바이스가 이미 목록에 있는지 확인
      const isDuplicate = this.state.devices.some(d => d.id === device.id);
      if (!isDuplicate) {
        // 스캔된 블루투스 디바이스를 목록에 추가
        this.setState(prevState => ({
          devices: [...prevState.devices, device],
        }));
      }
    });
  }

  // 디바이스 연결 함수
  connectToDevice(device) {
    this.manager.stopDeviceScan(); // 스캔 중지
    this.manager
      .connectToDevice(device.id)
      .then(connectedDevice => {
        this.setState({connectedDevice});
      })
      .catch(error => {
        console.error('Error while connecting:', error);
      });
  }

  // 연결 해제 함수
  disconnectDevice() {
    this.manager
      .cancelDeviceConnection(this.state.connectedDevice.id)
      .then(() => {
        this.setState({connectedDevice: null});
      })
      .catch(error => {
        console.error('Error while disconnecting:', error);
      });
  }

  render() {
    return (
      <View>
        <Text>Available Devices:</Text>
        <FlatList
          data={this.state.devices}
          keyExtractor={device => device.id}
          renderItem={({item}) => (
            <Button
              title={item.name || item.id}
              onPress={() => this.connectToDevice(item)}
            />
          )}
        />
        {this.state.connectedDevice && (
          <View>
            <Text>
              Connected Device:{' '}
              {this.state.connectedDevice.name || this.state.connectedDevice.id}
            </Text>
            <Button
              title="Disconnect"
              onPress={() => this.disconnectDevice()}
            />
          </View>
        )}
      </View>
    );
  }
}

export default BluetoothScanner;
