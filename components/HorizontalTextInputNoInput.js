import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default class HorizontalTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  getValue() {
    return this.state.value;
  }

  render() {
    const { title, placeholder, placeholderTextColor, autoCorrect, onChangeText, value, editable, containerStyle, secureTextEntry } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          style={styles.value}
          autoCorrect={autoCorrect}
		  secureTextEntry={secureTextEntry}
          editable={editable}
          value={value}
        />
      </View>
    );
  }
}

HorizontalTextInput.defaultProps = {
  placeholderTextColor: '#7d7d7d',
  value: ''
};

const styles = StyleSheet.create({
  title: { color: Colors.grayPrimary, fontSize:12 },
  value: {
    color: Colors.grayPrimary,
    fontSize:14,
    paddingVertical: 8,
    textAlign:'left',
    width:200,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  }
});
