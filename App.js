/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';


import Image  from 'react-native-image-progress';
import ProgressBar from 'react-native-progress';

export default class HelloWorldApp extends Component {
  
  constructor(props) {
    super(props);
  this.getListCall= this.getListCall.bind(this);
  this.GetListItem = this.GetListItem.bind(this);
      this.state = { 
      JSONResult: "",
    }
  }
 
   componentDidMount(){
    this.getListCall();
  }
 
  getListCall(){
    var that = this;
    var url = "https://jsonkeeper.com/b/YKTT" // itunes search endpoint
    console.log("-----------url:"+url);
 
     fetch(url,{method: 'GET',  headers: {
      Accept: 'application/json',
    }}).then(function (response) {
      console.log('status Code ',response.status);  
      return response.json();
        }).then(function (result) { 
 
                that.setState({ 
              JSONResult: result,
              });
        }).catch(function (error) {
          console.log("-------- error ------- "+error);
         alert("result:"+error)
     });
 
  }
 

  GetListItem (name) {
   
  Alert.alert(name);
 
  }
 
  ItemSeparatorLine = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#111a0b",
        }}
      />
    );
  }
    render() {

      return ( 
          <View style={styles.container}>
  
          <FlatList
         
            data={ this.state.JSONResult.results }
            
            ItemSeparatorComponent = {this.ItemSeparatorLine}
   
            renderItem={({item}) => 
            <TouchableOpacity activeOpacity={0.9} onPress={this.GetListItem.bind(this, item.trackName)}>
             <View style={styles.container} >
                
               <Image 
              source={{ uri: item.artworkUrl100 }} 
               indicator={ProgressBar} 
               indicatorProps={{
                 size: 80,
                 borderWidth: 0,
                 color: 'rgba(150, 150, 150, 1)',
                 unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
                 style={{
                  width: 190, 
                    height: 190, 
                      alignItems: 'center',
                      margin: 5,
                      justifyContent: 'center',
              }}
              />
  
  
            <Text style={styles.welcome}  > {item.trackName} </Text>
  
              </View>
              </TouchableOpacity>
  
           }
             numColumns={2}    //<---- add this line for GridView, if you remove this line then it will display ListView
            keyExtractor={(item, index) => index}
            
           />
        </View>  
   
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});