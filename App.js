import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, Image, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

const oriflame = require('./src/images/oriflame.png');
const logo = require('./src/images/logo.png');
const makeup = require('./src/images/makeup.png');

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>PENGECEKAN PRODUK ORIFLAME</Text>

      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
constructor()
    {
        super();
 
        this.state = { 
          kode: '',
          nama: '',
          status: '', 
          ActivityIndicator_Loading: false, 

        }
    }
    //fungsi mengirim data ke database
    Insert_Data_Into_MySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('https://widhi-adnyani.000webhostapp.com/oriflame/kirimData.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  kode : this.state.kode,
                  nama : this.state.nama,
                  status : this.state.status,
              
                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                /*Alert.alert(
                  'Oops!',
                  'Something went wrong!',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )*/
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }
  render() {
       return (
         <View style={styles.containerMain}>

      <View style={styles.box2}>

       <View style={{ flex: 1, alignItems: 'center', paddingTop: 25 }}>
        <View style={styles.iconContainer}>
            <Image source={oriflame} style={styles.icon} />
          </View>
        <Text>{'\n'}</Text>
        <Text>Masukan Kode Produk</Text>
        <TextInput
                style={{ height: 40, width: 150, textAlign:'center'}}
              placeholder="Masukan Kode "
              onChangeText={(kode) => this.setState({ kode })}
            />
            <Text>Masukan Nama Produk</Text>
        <TextInput
                style={{ height: 40, width: 150, textAlign:'center' }}
              placeholder="Masukan Nama "
              onChangeText={(nama) => this.setState({ nama })}
            />
            <Text>Masukan Status Produk</Text>
        <TextInput
                style={{ height: 40, width: 150, textAlign:'center' }}
              placeholder="Masukan Status "
              onChangeText={(status) => this.setState({ status })}
            />
               <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle } 
                  onPress = { this.Insert_Data_Into_MySQL }>

                    <Text style = { styles.TextStyle }>Input </Text>
                </TouchableOpacity>

                {
        
                this.state.ActivityIndicator_Loading ? <ActivityIndicator color='yellow' size='large'style={styles.ActivityIndicatorStyle} /> : null
                
                }
            <Button
              title="Lihat produk ORIFLAME"
              onPress={() => this.props.navigation.navigate('Profile')}
              color="blue"
            />
      </View>
      </View>
      </View>
     
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}

  componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'https://widhi-adnyani.000webhostapp.com/oriflame/getData.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false, 

          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.kode;

  render() {
    return (
      <View style={ styles.MainContainer }>
         {
          this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null        
          }
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.BoxClass}>
              <Text>Kode Produk : {item.kode}</Text>
              <Text>Nama Produk : {item.nama}</Text>
              <Text>Status Produk : {item.status}</Text>
            </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        /> 
        
   </View>   

    );
  }
}

class AwalScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
  render() {
    return (
      
      <View style={styles.containerMain}>

      <View style={styles.box2}>

       <View style={{ flex: 1, alignItems: 'center', paddingTop: 25 }}>
        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.logoContainer}>
            <Image source={makeup} style={styles.logo} />
          </View>
          <View style={{ flexDirection: 'row',paddingTop: 20 }}>
          <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.ButtonStyle } 
                  onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style = { styles.TextStyle }>Input Data </Text>
          </TouchableOpacity>
        
        <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.ButtonStyle } 
                  onPress={() => this.props.navigation.navigate('Profile')}>
                    <Text style = { styles.TextStyle }>Lihat Data</Text>
          </TouchableOpacity>
          </View>
      </View>
      </View>
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Awal: {
      screen: AwalScreen,
    },
  },
  {
    initialRouteName: 'Awal',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#BBDEFB',
    flex: 1,
    flexDirection: 'column'
  },
  MainContainer: {
    backgroundColor: '#BBDEFB',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    flex: 0.9,
    backgroundColor: '#f1ca65',
  },
  box2: {
    flex: 0.8,
    backgroundColor: '#139fdb',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  box3: {
    flex: 0.3,
    backgroundColor: '#139fdb',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  box4: {
    flex: 0.3,
    backgroundColor: '#f1ca65',
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  box5: {
    flex: 0.7,
    backgroundColor: '#1565C0',
    margin: 10
  },
  BoxClass:
    {
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      height: 100,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor : "#e3ecfc",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: 280,
      paddingTop: 10,
      paddingBottom: 10,
    },
  button: {
    width: 140,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  iconContainer: {
    alignItems: 'center',
    //backgroundColor: '#fff',
    borderColor: '#139fdb',
    //borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    height: 170,
    width: 170,
  },
  logoContainer: {
    alignItems: 'center',
    //backgroundColor: '#fff',
    borderColor: '#139fdb',
    //borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
  },
  icon: {
    //tintColor: 'green',
    height: 170,
    width: 170,
  },
  logo: {
    //tintColor: 'green',
    height: 150,
    width: 320,
  },
  TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'blue',
      marginBottom: 20,
      width: '70%',
      borderRadius: 2 
 
    },
    ButtonStyle:
   {
      paddingTop:10,
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom:10,
      backgroundColor:'blue',
      marginBottom: 20,
      width: '50%',
      borderRadius: 2,
      marginLeft: 20,
      marginRight: 20, 
 
    },
 
    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },

    ActivityIndicatorStyle:{
      
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    
  },
});
