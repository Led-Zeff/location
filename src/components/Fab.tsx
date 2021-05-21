import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  icon: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Fab = ({ icon, onPress, ...other }: Props) => {
  return (
    <View {...other}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.button}>
        <Text style={styles.text}>{icon}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 999,
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: 100,
    color: 'white',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
});
