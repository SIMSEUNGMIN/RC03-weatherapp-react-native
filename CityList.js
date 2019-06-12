import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Constants } from 'expo';
import * as Font from 'expo-font';

export default class CityList extends React.Component {
   async componentDidMount() {
        fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
          .then(response => response.json())
          .then(cities => {
            console.log('cities =', cities.length);
            this.setState({
              cities
            });
          });

       await Font.loadAsync({
           'Regular': require('./assets/fonts/DancingScript-Regular.ttf'),
         });

      }

  static navigationOptions = ({ navigation }) => {
      return {
        headerTitle : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 25}}>
                        How is the weather?
                      </Text>
                </View>
            ),
            headerStyle: {
                 backgroundColor: '#C8d7ff',
              },
      };
    };

//  navigationOptions = {
//    headerTitle : (
//        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//              <Text style={styles.text}>
//                How is the weather?
//              </Text>
//        </View>
//    ),
//    headerStyle: {
//         backgroundColor: '#C8d7ff',
//      },
////    headerTitleStyle: {
////       fontFamily: 'Regular',
////      },
//  };

  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    );
  }

  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Text style={styles.text}>{city}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item}
                data={this.state.cities}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4ffff',
  },

  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#C8d7ff',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Regular',
  }
});
