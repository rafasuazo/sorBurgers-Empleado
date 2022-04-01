import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
const ip = require('../ip/ip');

export default function CrearUsuario({navigation}){

    // hooks
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    const terms = "Al usar SorBurgers-app acepta nuestros términos y condiciones."; 

    const pressHandler = async () => {

        if(correo.length <= 0 || contrasenia.length <= 0){
            Alert.alert("SorBurgers", "Campos no pueden ir vacíos");
        }
        else{

            try{

                const respuesta = await fetch(ip.ip + "usuarios/guardar/empleado",
                    {
                        method: 'POST',
                        headers:{
                            Accept: "application/json",
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            correo: correo,
                            contrasenia: contrasenia
                        })
                    }
                );

                const json = await respuesta.json();
                console.log(json);

                if(json.errors){

                    json.errors.forEach((error) => {
                        Alert.alert("SorBurgers", error.msg)
                    });
                }
                else{

                    if(json.msj == "Correo existente!"){
                        Alert.alert("SorBurgers", json.msj)
                    }
                    else{

                        navigation.navigate('Login');
                    }
                }
            }
            catch(err){
                console.log(err);
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.signin}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sign In</Text>

                    <View style={styles.acountContainer}>
                        <Text style={styles.acountTitle}>Crea tu cuenta en SorBurgers Administrativo</Text>
                    </View>
                </View>

                <View style={styles.inputsContainer}>
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
                        placeholderTextColor={"#E4DBD9"}
                        autoCapitalize={'none'}
                        secureTextEntry={true}
                        passwordRules=''
                        onChangeText={(val) => setContrasenia(val)}
                        />

                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Confirmar" onPress={pressHandler} />
                        </View>
                    </View>
                </View>

                <View style={styles.terms}>
                    <Text style={{color: "#E4D8D9", textAlign: "center"}}>{terms}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#111B1E",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    signin:{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "15%"
    },
    titleContainer:{
        padding: 25,
        alignItems: "stretch"
    },
    title:{
        color: "#E4DBD9",
        fontSize: 36,
        textAlign: "center"
    },
    acountContainer:{
        alignItems: "center",
        justifyContent: "center",
        marginTop: "7%",
        marginBottom: "7%"
    },
    acountTitle:{
        color: "#6E93D6",
        fontSize: 25,
        textAlign: "center",
        marginTop: 15,
        padding: 15
    },
    inputsContainer: {
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
    buttonContainer: {
        padding: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "10%"
    },
    button:{
        padding: 5
    },
    terms:{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 15,
        paddingBottom: 20,
        width: "100%"
    }
})