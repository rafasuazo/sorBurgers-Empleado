import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Button, TextInput, ToastAndroid} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
const ip = require('../../ip/ip');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MostrarProducto({route,navigation}){
    const {id} = route.params;
    // let param = JSON.stringify(item);
    // const id = JSON.parse(param);
    //const [info, setInfo] = useState([]);
    const [ejecucion, setEjecucion] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcionProducto, setdescripcionProducto] = useState('');
    const [precio, setPrecio] = useState('');

    //Agregar al item al carrito con AsyncStorage
    const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Producto añadido al Carrito!',
          ToastAndroid.SHORT,
        );
        navigation.goBack();
      } catch (error) {
        return error;
      }
      } else {
        let array = [];
        array.push(id);
        try {
          await AsyncStorage.setItem('cartItems', JSON.stringify(array));
          ToastAndroid.show(
            'Producto añadido al Carrito!',
            ToastAndroid.SHORT,
          );
          navigation.goBack();
        } catch (error) {
          return error;
        }
      }
    };

    if(ejecucion==null){
        try {
            const response = fetch(ip.ip + "productos/editar?id="+id, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                    setNombre(json.nombre);
                    setdescripcionProducto(json.descripcionProducto);
                    setPrecio(json.precio);
                    console.log(json);
                });  
            setEjecucion(false);
        } 
        catch (error) {
            setEjecucion(false);
            console.error(error);
        }
        setEjecucion(false);  
    }
    return (
        <SafeAreaView style={{backgroundColor: '#111B1E'}}>
          <View style={styles.titulo}>
            <Icon style={{color: 'white'}} name="arrow-back-ios" size={28} onPress={navigation.goBack} />
            
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Atras</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 280,
              }}>
              <Image source={require("../../assets/ham.jpg")} style={{height: 220, width: 220, borderRadius: 20}} />
            </View>
            <View style={styles.detalle}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextInput    
                  style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}
                  placeholder=""
                  placeholderTextColor={"#E4DBD9"}
                  defaultValue={nombre}
                  editable={false}
                  multiline
                />
              </View>
                <TextInput      
                  style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}
                  placeholder=""
                  textAlign={'right'}
                  placeholderTextColor={"#E4DBD9"}
                  defaultValue={"Lps. "+precio}
                  editable={false}
                />
                <TextInput      
                  style={styles.detailsText}
                  placeholder=""
                  placeholderTextColor={"#E4DBD9"}
                  defaultValue={descripcionProducto}
                  editable={false}
                  multiline
                />
                
              <View style={{marginTop: 40, marginBottom: 40}}>
                <Button 
                  title="Añadir al Carrito"
                  onPress={() => (addToCart(id))}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#111B1E',
        width:'100%',
        height:'100%',
        alignItems:'center',
        fontSize:20
    },
    titulo: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    detalle: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: "#8d00c9",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        color: "#ffffff",
    },
    comings:{
      width: 300,
      padding: 15,
      marginBottom: "10%",
      fontSize: 18,
      color: "#E4DBD9",
      backgroundColor: "#2F4C58",
      borderRadius: 10
  },
})