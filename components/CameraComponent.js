import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Camera} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useNavigation} from '@react-navigation/native';

const CameraComponent = ({onBarCodeScanned}) => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScannedInternal = ({type, data}) => {
    setScanned(true);
    onBarCodeScanned({type, data});
  };

  const openCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };
  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScannedInternal}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleBackButtonPress}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#44299e',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CameraComponent;