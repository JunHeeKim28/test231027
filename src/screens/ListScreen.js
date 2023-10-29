//이주 성공
import React from 'react';
import {View, Text} from 'react-native';

const App = () => {
  return (
    <View>
      <Text>Hello, React Native!</Text>
    </View>
  );
};

export default App;

// import bluetooth;
// server_sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
// port =1
// server_sock.bind(('',port))
// server_sock.listen(1)

// print("Waiting RFCOMM channel", port)
// client_sock, client_info = server.accept()
// print("Accepted connection from", client_info)

// try:
//     while True:
//       data = client_sock.recv(1024)
//       data=str(data)
//       if not data:
//           break
//       print("received", data)
//       client_sock.send("Echo: "+data)
// except OSError:
//     pass
// print("Disconnected")
// client.sock.close()
// server.sock.close()
// hostMACAddress='D8:3A:DD:1E:A8:72'
// print("All done")
