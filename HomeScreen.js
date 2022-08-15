import * as React from 'react';
import { Pressable, Text, ImageBackground, StyleSheet } from 'react-native';

export default HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={require('./assets/pedometer.png')}
    >
      {/* <Button
        style={styles.button}
        title="Go to your step counter"
        onPress={() => navigation.navigate('Counter')}
      /> */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Counter')}
      >
        <Text
          style={{
            fontSize: 20,
            backgroundColor: '#FCDEBE',
          }}
        >
          Go to your step counter
        </Text>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
