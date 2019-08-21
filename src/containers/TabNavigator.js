// ce coposant gere les titre, les icone en bas
// donc appliquer un fond pour la partie haute
// puis la couleur du texte de page d'accueil et parametre en blanc
//Dans Airbnb en bonus pour la map voir doc map view
// Cf statusBar pour crer 2 bouton sur la partie supérieur
// En fonction de l’état
// Donc renderTab
// pour la map voir doc map view donc il faut installer expo i react native map
// puis une fois qu il est installer refaire npm start
// du coup la carte est centré sur la position
// on peut ajouter des epingle cf marker dans le cours map
// pour verifier le conteneu aller dans post man cf correction farid MapView.marker
//JS.coach  = moteur de recherche des composant

import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case "Home":
            iconName = "ios-home";

            break;
          case "Settings":
            iconName = "ios-settings";

            break;
          default:
            iconName = null;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle;

  switch (routeName) {
    case "Home":
      headerTitle = "Mon AirBnb";

      break;
    case "Settings":
      headerTitle = "Paramètres";
      break;
    default:
      headerTitle = routeName;
  }

  return {
    headerTitle: headerTitle,
    headerStyle: {
      backgroundColor: "#ff595f"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
};

export default TabNavigator;
