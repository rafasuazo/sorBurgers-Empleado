import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PasswordVisibility } from '../hooks/passwordVisibility';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({navigation}) {

  // hooks
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  // recibiendo el hooks que ayudará a mostrar  y/u ocultar la contraseña
  const {passwordVisibility, rightIcon, handlePasswordVisibility} = PasswordVisibility();

  const terms = "Al usar SorBurgers-app acepta nuestros términos y condiciones.";

  const sessionHandler = async () => {

    if(correo.length <= 0 || contrasenia.length <= 0){
      Alert.alert("SorBurgers", "Campos no pueden ir vacíos");
    }
    else{

      try{

        const respuesta = await fetch(
          'http://192.168.0.9:3003/api/autenticacion/iniciosesion',
          {
            method: 'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              correo: correo,
              contrasenia: contrasenia
            })
          }
        );

        const json = await respuesta.json();
        console.log(json);        
        
        if(json.msj == "Credenciales incorrectas"){
          Alert.alert("SorBurgers", json.msj);
        }
        else if(json.msj == "Usuario no registrado"){
          Alert.alert("SorBurgers", json.msj);
        }
        else{

          const token = json.id.token;
          const cliente = JSON.stringify(json.id);
          await AsyncStorage.setItem('cliente', cliente); // guardando info del cliente
          await AsyncStorage.setItem("Token", token);
          const usuario = json.msj;
          navigation.navigate('Home', {screen: 'Inicio', params: {usuario: usuario}})
        }
      }
      catch(err){
        
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <View style={styles.titleContainer}>

          <Text style={styles.title}>Log In</Text>
          
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Bienvenido a SorBurgers Restaurant</Text>
          </View>

        </View>
        
          <View style={styles.controlContainer}>
            <View style={styles.controls}>

              <TextInput
              
              style={styles.comings}
              placeholder="Correo electrónico"
              placeholderTextColor={"#E4DBD9"}
              autoCapitalize={'none'}
              keyboardType={"email-address"}
              onChangeText={(val) => setCorreo(val)}

              />
              
              <TextInput
              
              style={styles.comings}
              placeholder="Contraseña"
              passwordRules=''
              placeholderTextColor={"#E4DBD9"}
              secureTextEntry={passwordVisibility}
              autoCapitalize={'none'}
              onChangeText={(val) => setContrasenia(val)}
              
              />

              <TouchableOpacity onPress={() => navigation.navigate('Recuperacion')}>
                <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.createAccount}>Crear cuenta</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.buttonContainer}>
              <View style={styles.buttons}>
                <Button title='Confirmar' onPress={sessionHandler} />
              </View>
            </View>

            <View style={styles.terms}>
              <Text style={{color: "#E4D8D9", textAlign: "center"}}>{terms}</Text>
            </View>

          </View>
      </View>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111B1E",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  login: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "15%"
  },
  titleContainer:{
    padding: 25,
    alignItems: "stretch",
    justifyContent: "center"
  },
  title:{
    color: "#E4DBD9",
    fontSize: 36,
    textAlign: "center"
  },
  welcomeContainer:{
    alignItems: "center",
    justifyContent: "center",
    marginTop: "12%",
    marginBottom: "12%"
  },
  welcomeTitle:{
    color: "#6E93D6",
    fontSize: 25,
    textAlign: "center",
    marginTop: 15
  },
  controlContainer:{
    flex: 1,
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  controls:{
    padding: 15,
    paddingHorizontal: "10%"
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
  forgotPassword:{
    textAlign: "right",
    color: "#6E93D6",
    fontSize: 16,
    alignItems: "center"
  },
  createAccount:{
    marginTop: 15,
    textAlign: "right",
    color: "#6E93D6",
    fontSize: 16
  },
  buttonContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "5%",
  },
  buttons:{
    padding: 10
  },
  terms: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 15,
    paddingBottom: 20
  }
})