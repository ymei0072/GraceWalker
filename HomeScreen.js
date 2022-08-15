import * as React from 'react';
import { Button } from 'react-native';

export default HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to your step counter"
      onPress={() => navigation.navigate('Counter')}
    ></Button>
  );
};
