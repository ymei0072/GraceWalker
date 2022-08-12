import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {
  const [PedometerAvailability, setPedometerAvailability] = useState('');
  const [stepCount, setStepCount] = useState(0);

  let WindowHeight = Dimensions.get('window').height;

  //approx. 2k steps per mile (4mph brisk walking)
  let distance = stepCount / 2000;
  let distanceCovered = distance.toFixed(2);

  //calorie count approx 65cal burned per mi. for 120lb person
  let calorie = distanceCovered * 65;
  let caloriesBurnt = calorie.toFixed(2);

  useEffect(() => {
    subscribe();
  }, []);

  subscribe = () => {
    //counting # of steps and storing in stepCount
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    //Is the pedometer available on the device?
    // Pedometer.isAvailableAsync().then(
    //   (result) => {
    //     setPedometerAvailability(String(result));
    //   },
    //   (error) => {
    //     setPedometerAvailability(error);
    //   }
    // );
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
            Get Your Steps In!
            {/* {PedometerAvailability} */}
          </Text>
        </View>
        <View style={{ flex: 3 }}>
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

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.textDesign,
                {
                  paddingLeft: 20,
                  marginLeft: '23%',
                },
              ]}
            >
              Target: 5000 steps
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.textDesign,
                {
                  width: '93%',
                  paddingLeft: 20,
                  marginLeft: '-3.5%',
                },
              ]}
            >
              Distance: {distanceCovered} miles
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.textDesign,
                {
                  paddingLeft: 10,
                  marginLeft: '23%',
                },
              ]}
            >
              Calories Burned: {caloriesBurnt}
            </Text>
          </View>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
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
    fontSize: 20,
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
