import React from "react";
import { StyleSheet, View, Text } from "react-native";
import StarRating from "react-native-star-rating";

class StarsEx extends React.Component {
  render() {
    return (
      <View style={{ width: 20 }}>
        <StarRating
          disabled={true}
          emptyStar={"ios-star-outline"}
          fullStar={"ios-star"}
          halfStar={"ios-star-half"}
          iconSet={"Ionicons"}
          maxStars={5}
          rating={this.props.starCount}
          fullStarColor={"gold"}
          starSize={20}

          //doc https://js.coach/react-native-star-rating?search=star+rating+react+native
        />
      </View>
    );
  }
}

export default StarsEx;
