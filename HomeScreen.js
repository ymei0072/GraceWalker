import * as React from 'react';

export default HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to your step counter"
      onPress={() => navigation.navigate('Profile')}
    />
  );
};
