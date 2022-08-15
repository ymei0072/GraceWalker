import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function Counter({ navigation }) {
  const [stepCount, setStepCount] = useState(0);

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
    Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={require('./assets/walking.png')}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.headingDesign}>Get Your Steps In!</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text
              style={{
                fontSize: 20,
                backgroundColor: '#FCDEBE',
              }}
            >
              Go Home
            </Text>
          </Pressable>
        </View>
        <View style={{ flex: 3 }}>
          <CircularProgress
            value={stepCount}
            maxValue={5000}
            radius={190}
            textColor={'#FCDEBE'}
            activeStrokeColor={'#FCDEBE'}
            inActiveStrokeColor={'#D4D2A5'}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={40}
            activeStrokeWidth={40}
            title={'Steps'}
            titleColor={'#FCDEBE'}
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
                  marginLeft: '-7%',
                },
              ]}
            >
              {'  '}
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
    color: '#1B3022',
    backgroundColor: 'rgba(212, 210, 165,0.5)',
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    borderRadius: 20,
    borderColor: '#1B3022',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textDesign: {
    backgroundColor: 'rgba(212, 210, 165,0.5)',
    height: 50,
    width: '85%',
    borderColor: '#1B3022',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    fontSize: 25,
    color: '#1B3022',
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
