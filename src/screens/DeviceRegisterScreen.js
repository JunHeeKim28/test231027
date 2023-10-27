import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import BleManager from 'react-native-ble-manager';

class BluetoothApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      connectedDevice: null,
    };
  }

  componentDidMount() {
    BleManager.start({showAlert: false});

    // Bluetooth 디바이스 스캔 이벤트 처리
    BleManager.onDiscover(device => {
      // 스캔된 디바이스를 state에 추가
      this.setState(prevState => ({
        devices: [...prevState.devices, device],
      }));
    });
  }

  scanForDevices = () => {
    this.setState({devices: []});
    BleManager.scan([], 5, true); // 스캔 시간(초)을 조정하세요
  };

  connectToDevice = device => {
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to device:', device.name);
        this.setState({connectedDevice: device});
      })
      .catch(error => {
        console.error('Connection error:', error);
      });
  };

  renderItem = ({item}) => (
    <View>
      <Text>{item.name || 'Unknown'}</Text>
      <Text>{item.id}</Text>
      <Button title="Connect" onPress={() => this.connectToDevice(item)} />
    </View>
  );

  render() {
    return (
      <View>
        <Button title="Scan for Devices" onPress={this.scanForDevices} />

        {this.state.connectedDevice && (
          <Text>
            Connected to: {this.state.connectedDevice.name || 'Unknown'}
          </Text>
        )}

        <Text>Discovered Devices:</Text>
        <FlatList
          data={this.state.devices}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default BluetoothApp;
