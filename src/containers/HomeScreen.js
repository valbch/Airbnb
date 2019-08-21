// / donc now on arrive sur la page d'accueil homescrenn sur laquelle il y a les appartement
// donc besoin d'un componentndidmonth qui va appeler axios -appeler l'api en get
// api= contient un objet  on modifie l'etat avec setState puis declache un render
//flatlist mettre les propriete en 1= data et renderitem
// puis mettre les this.state.rooms ...
//composant utiliser dans plusieur page et contenanire different - a revoir la difference entre composant et contenanire
//KeyExtractor est une fonction qui recupere chaue appart retun l'id -suite à l'eurreu
// c'est une clé d'element elle recoit chaque appart -

// regarder la doc de react navigation puis headerStyle
// mais le titre est dans le conteneur TabNavigator
// suite Tabnavigator

// mettre les images =   balise image et mettre une largeur et une hauteur sinon apparait pas car zero par defaurl
// cf exemple sur la doc : https://facebook.github.io/react-native/docs/image.html
// par dessu les prix en bas a gauche- il y a un composant pour mettre image ds le fond = imageBackground cf la doc
// dans la balise imagebackground mettre une view et un <text>

// puis s'occuper de la partie en dessous = une view avec text et image = 1 contneur a gauche et un autre a droite
// cf les lignes text {obj.item.title}
// puis faire en sorte que la photo soit aligné a droite et faire en sorte que le texte ne fasse pas plus d'une ligne avec le numberOfLines

// reste la dernier e etape: afficher dynamiquement les etoile en fonction de la note
// donc creer une fonction renderstars qui sera appeler plus bas en 1 juste la syntaxe
// creer une fonction car il y aura une boucle du coup c'est bien de separer
// pour que ce soit dynamique creer une variable avec un tableau const stars =[] puis lui pusher en text une *
// c'est un tableau qui contient du text - cf l'etape de la photo 1
// puis remplacer l'etoile de <text> avec l'icone
// puis les mettre sur la meme ligen en creant un contenenur cf photo 2
// trnasmetre ratinvalue dans la fonction (trouver dans l'api)
// puis faire une boucle = mettre toujours une etoile sauf que cette fois soit elles sont gold soit elle sont grey
// cf phoot 3 - puis mettre une key cf photo 4
// ala place re review dans text mettre {obj. }

import React from "react";
import {
  Button,
  View,
  FlatList,
  Text,
  ImageBackground,
  Image,
  StyleSheet
} from "react-native";
import Axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating";
import StarsEx from "./ExampleStar";

class HomeScreen extends React.Component {
  state = {
    room: null,
    isLoading: true
  };

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Accueil"
    };
  };
  componentDidMount = async () => {
    const response = await Axios.get(
      "https://airbnb-api.now.sh/api/room?city=paris"
    );
    this.setState({
      room: response.data.rooms,
      isLoading: false
    });
  };
  render() {
    if (this.state.room) {
      return (
        <View>
          <View>
            <Button
              title="Aller sur une autre page"
              onPress={this.showMoreApp}
            />
          </View>
          <FlatList
            // le Flatlit est comme un map, sauf qu il a des propriété
            style={{ padding: 20 }}
            // data: il faut mettre un tableau d'objet
            data={this.state.room}
            //keyExtractor= il y a string pour convertir au cas ou il y a un num -
            //KeyExtractor est une fonction qui recupere chaque appart - c'est une clé d'element elle recoit chaque appart -
            keyExtractor={item => String(item._id)} // c'est pas formecement _id voir selon l'object que je recupere
            // ce qu il renvoi
            renderItem={obj => {
              return (
                <View>
                  <ImageBackground
                    source={{ uri: obj.item.photos[0] }}
                    style={{ height: 150 }}
                  >
                    <View
                      style={{
                        backgroundColor: "black",
                        position: "absolute",
                        width: 60,
                        height: 30,
                        left: 0,
                        bottom: 10
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 20 }}>
                        {obj.item.price} €
                      </Text>
                    </View>
                  </ImageBackground>
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
                        {obj.item.title}
                      </Text>
                      <StarsEx starCount={obj.item.ratingValue} />
                    </View>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25
                      }}
                      source={{ uri: obj.item.user.account.photos[0] }}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  }

  showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };
}

export default HomeScreen;
