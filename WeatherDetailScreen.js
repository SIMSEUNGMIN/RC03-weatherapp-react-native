import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import { marginVertical } from 'react-native';
import * as Font from 'expo-font';

export default class WeatherDetailScreen extends React.Component {

   async componentDidMount() {
       const { navigation } = this.props;
       const cityName = navigation.getParam('city', null);
       const appkey = "863ad56ee6fc4b36f0d7bcc72b03ba72";

       fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appkey}`)
         .then(response => response.json())
         .then(info => {
           this.setState({
             ...info,
             isLoading: false,
           });
         });

         await Font.loadAsync({
                    'Regular': require('./assets/fonts/DancingScript-Regular.ttf'),
          });

     }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle : (
         <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 25}}>
                      Weather you want : {navigation.getParam('city', 'Unknown')}
              </Text>
         </View>
                  ),
      headerStyle: {
          backgroundColor: '#C8d7ff',
       },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    //섭씨온도
    let celsius = this.state.main.temp - 273.15;
    //예상 최고 온도
    let highcelsius = this.state.main.temp_max - 273.15;
    //예상 최저 온도
    let lowcelsius = this.state.main.temp_min - 273.15;
    //날씨
    let weather = this.state.weather[0].main;
    //습도
    let humidity = this.state.main.humidity;


    return (
      <View style={styles.container}>
        <Text style={styles.weather}>{weather}</Text>
        <Text style={styles.average}>Average : {celsius.toFixed(1)} °C</Text>
        <Text style={styles.text}>Maximum : {highcelsius.toFixed(1)} °C</Text>
        <Text style={styles.text}>Minimum : {lowcelsius.toFixed(1)} °C</Text>
        <Text style={styles.text}>Humidity : {humidity}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4ffff',
    alignItems: 'center',
  },
  text: {
      fontSize: 30,
      marginTop: 50,
      fontFamily: "Regular",
    },
  average: {
        fontSize: 50,
        marginTop: 30,
        fontFamily: "Regular",
      },
  weather: {
     fontSize: 60,
     marginTop: 60,
     fontFamily: "Regular",
  },
});
