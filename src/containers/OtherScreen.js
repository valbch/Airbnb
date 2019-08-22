import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  ImageBackground
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

import StarsEx from "./ExampleStar";
// import SwiperComponent from "../components/SwiperComponent";
import Swiper from "react-native-swiper";
import Geolocalisation from "../containers/Geolocalisation";

const { width, height } = Dimensions.get("window");

class OtherScreen extends React.Component {
  state = {
    room: null
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Autre page",
      headerStyle: {
        backgroundColor: "#ff595f"
      },
      headerTitleStyle: {
        color: "white"
      }
    };
  };
  // il faut mettre un componentDidMont pour afficher toutes les infos
  componentDidMount = async () => {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room/" +
        this.props.navigation.getParam("id")
    );
    console.log(response.data.photos);
    this.setState({
      room: response.data
      // isLoading: false
    });
  };

  render() {
    // console.log("paramètre passé", this.props.navigation.getParam("id"));
    if (this.state.room) {
      return (
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              height: 300
            }}
          >
            <Swiper
              showsButtons={true}
              nextButton={
                <View>
                  <AntDesign name="right" size={30} color="white" />
                </View>
              }
              prevButton={
                <View>
                  <AntDesign name="left" size={30} color="white" />
                </View>
              }
              dot={
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,.5)",
                    width: 5,
                    height: 5,
                    borderRadius: 7,
                    marginLeft: 7,
                    marginRight: 7
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: 5,
                    height: 5,
                    borderRadius: 7,
                    marginLeft: 7,
                    marginRight: 7
                  }}
                />
              }
              paginationStyle={{
                bottom: 20
              }}
            >
              {this.state.room.photos.map((item, index) => {
                return (
                  <View key={index}>
                    <ImageBackground
                      style={styles.image}
                      source={{ uri: item }}
                    >
                      <View
                        style={{
                          backgroundColor: "black",
                          position: "absolute",
                          width: 60,
                          height: 30,
                          left: 0,
                          bottom: 50
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 20 }}>
                          {this.state.room.price} €
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                );
              })}
            </Swiper>
          </View>
          {/* <Image source={{ uri: this.state.room.photos[0] }} /> */}
          <View style={{ flex: 2, marginHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 20,
                justifyContent: "space-between"
              }}
            >
              <View style={{ width: 250 }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ fontSize: 20 }}
                >
                  {this.state.room.title}
                </Text>
                <View style={{ marginTop: 8 }}>
                  <StarsEx starCount={this.state.room.ratingValue} />
                </View>
              </View>
              <View>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25
                  }}
                  source={{
                    uri:
                      this.state.room.user &&
                      this.state.room.user.account.photos[0]
                  }}
                />
              </View>
            </View>

            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={{ fontSize: 20 }}
            >
              {this.state.room.description}
            </Text>
          </View>
          <Geolocalisation coord={this.state.room.loc} />
        </ScrollView>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  wrapper: {
    // flex: 1,
    // height
  },
  image: {
    width: width,
    height: "100%"
    // backgroundColor: "transparent",
    // width
    // resizeMode: "stretch"
  }
});

export default OtherScreen;
