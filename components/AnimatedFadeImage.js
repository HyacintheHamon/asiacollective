import React from "react";
import { ActivityIndicator, Animated, View } from "react-native";

export default class AnimatedFadeImage extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
				<Animated.Image
					onLoad={this.onLoad}
					{...this.props}
					style={[
						{
							opacity: this.state.opacity
						},
						this.props.style,
					]}
				/>
			</View>
    );
  }
}
