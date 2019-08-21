// c'est le premier ecran de l'application
// code couleur = #FF les 2 premier on compte jusqu"a F donc base de 16 : valeur max FF donc rouge
// commencer par la couleur du fond
// retirer le bienvenue du title mettre header: null a la place et hop ca retire le cadre blanc du haut
// ensuite la maison : cf doc vector-icons
// mettre direct un safeAreaView
// puis textinput cf la doc de textinput pour les parametre
// pour mettre les petit rond a la place du mot de passe aller dans la doc et chercher secure je ne sais pas quoi
// pour changer la couleur de l'heure tout la haut aller dans la doc et regarder statusBar
// le composant KeybordAvoidingView cf cours pour le clavier

// mettre les info de arno dans postman pour acceder a son token
// kan l'utilisateur se connecte la premiere fois on va stoker son token - et kan l'utilisateur se deconnect on retir le token
// afficher console. log command D et clic sur debug
// juste le tps du develeppoment mettre le mot de passe et mail dans le state en dur
// faire un console.log(response.data)
// l'utilisateur transmet ses identifiant a internent- serveur nous renvoi un token , une clef -moins sensible que stoker le mot de passe
//AsynStarage gère ça.
// 2  ===> hommescrenn

import React from "react";
import {
  AsyncStorage,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

class SignInScreen extends React.Component {
  state = {
    email: "arno@airbnb-api.com",
    password: "password01"
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    // AsyncStorage= comme les cookies- ils sert à stocker tout ce que je veut -ici le token
    //
    this.props.navigation.navigate("App");
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FF595F" }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <StatusBar barStyle="light-content" />
          <View style={{ alignItems: "center" }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="home-heart"
                size={90}
                color="white"
              />
            </View>

            <Text style={styles.message}> Welcome</Text>
            <View>
              <TextInput
                style={{
                  height: 44,
                  width: 200,
                  fontSize: 20,
                  color: "white",
                  marginTop: 20,
                  borderBottomColor: "white",
                  borderBottomWidth: 1,
                  marginHorizontal: 20,
                  backgroundColor: "#FF595F"
                }}
                placeholder="arno@airbnb-api.com"
                placeholderTextColor="white"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />

              <TextInput
                style={{
                  height: 44,
                  width: 200,
                  fontSize: 20,
                  color: "white",
                  marginTop: 20,
                  borderBottomColor: "white",
                  borderBottomWidth: 1,
                  marginHorizontal: 20,
                  backgroundColor: "#FF595F"
                }}
                placeholder="PassWord"
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor="white"
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                try {
                  const response = await axios.post(
                    "https://airbnb-api.now.sh/api/user/log_in",
                    {
                      email: this.state.email,
                      password: this.state.password
                    }
                  );
                  if (response.data.token) {
                    this.signInAsync();
                  } else {
                    alerte("pas de token");
                  }
                } catch (err) {
                  alert("err connexion");
                }
              }}
            >
              <Text
                style={{
                  color: "#FF595F",
                  fontSize: 30
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

// const token = response.data.token;

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    margin: 30
  },
  message: {
    fontSize: 30,
    color: "white"
  },
  button: {
    marginTop: 40,
    backgroundColor: "white",
    height: 60,

    width: 200,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SignInScreen;
