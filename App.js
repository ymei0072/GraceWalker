import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {
  const [PedometerAvailability, setPedometerAvailability] = useState('');
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    subscribe();
  }, []);

  subscribe = () => {
    //counting # of steps and storing in stepCount
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    //Is the pedometer available on the device?
    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={require('./assets/walking.png')}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.headingDesign}>
            Get Your Steps In! {PedometerAvailability}
          </Text>

          <View>
            <CircularProgress
              value={stepCount}
              maxValue={5000}
              radius={210}
              textColor={'#ECF0F1'}
              activeStrokeColor={'#F39C12'}
              inActiveStrokeColor={'#9B59B6'}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={40}
              activeStrokeWidth={40}
              title={'Step Count'}
              titleColor={'#ECF0F1'}
              textStyle={{ fontWeight: 'bold' }}
            />
          </View>

          <View>
            <Text style={styles.textDesign}>Target: 5000 steps</Text>
          </View>

          <View>
            <Text style={styles.textDesign}>Distance Covered:</Text>
          </View>

          <View>
            <Text style={styles.textDesign}>Calories Burned:</Text>
          </View>
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headingDesign: {
    color: 'white',
    backgroundColor: 'rgba(155,89,182,0.5)',
    alignSelf: 'center',
    fontSize: '20',
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  textDesign: {
    backgroundColor: 'rgba(155,89,182,0.5)',
    height: 50,
    width: '85%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
});
