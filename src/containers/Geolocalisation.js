import React from "react";
import { Platform, Text } from "react-native";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";

// Attention a bien mettre React.Component dans la class et pas juste Component
// importer le component <Geolocalisatio/>
// installer expo install react-native-maps - et bien attendre la fin de l'installation-  + importe MapView
// En 1, j'ai copié-collé l'exemple du cours geolocalisation
// En 2, j'ai modifié les imports en fonction des messages d'erreur
// En 3,
// prendre longitude et latitude Paris car par default a san francisco
// dans simulateur aller dans le menu => debug puis location puis custom location et changer avec les infos de paris
// MAPS= puis faire le <MapView> dans le return -
// Mettre dans Latitude : this.state.location.coords.latitude
// à la place de latitude: 48.856614, puis idem=longitude: 2.3522219,
// AJOUTER UNE TAILLE a <MapView> sinon la map ne s'affiche pas
// MARKERS:
//   Récupérer la liste des apparts dans OtherScreen => dans <Geolocalisation coord={this.state.room.loc} />

export default class Geolocalisation extends React.Component {
  state = {
    localisation: null,
    errorMessage: null,
    room: {}
  };

  // Récupérer la latitude et longitude
  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      // const response = await Axios.get(
      //   "https://airbnb-api.now.sh/api/room?city=paris"
      // );
      this.setState({
        errorMessage:
          "La géolocalisation ne fonctionne pas sur le simulateur Android, tu peux tester sur ton device !"
      });
    } else {
      this.getLocationAsync();
    }
  }
  getLocationAsync = async () => {
    //Demander l'autorisation Localisation
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée"
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({
        location: location
      });
    }
  };
  render() {
    if (this.state.errorMessage) {
      return <Text>{this.state.errorMessage}</Text>;
    } else if (this.state.location) {
      return (
        <MapView
          style={{ flex: 1, height: 400 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.props.coord[1],
              longitude: this.props.coord[0]
            }}
            title={this.state.room.title}
          />
        </MapView>
      );
    } else {
      return <Text>En attente ...</Text>;
    }
  }
}
