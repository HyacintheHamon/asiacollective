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
    const { title, placeholder, placeholderTextColor, autoCorrect, onChangeText, value, editable, containerStyle, secureText } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.title}> {title} </Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'pink'}
          onChangeText={onChangeText}
		  style={styles.value}
          autoCorrect={autoCorrect}
		  secureText={secureText}
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
  title: { color: '#fff', fontSize:12 },
  value: {
    color: Colors.grayPrimary,
    fontSize:12,
    paddingVertical: 0,
    textAlign:'right',
    width:200,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: 'green',
    borderBottomWidth: 1
  }
});
