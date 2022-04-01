import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
const ip = require('../../ip/ip');

export default function GuardarPuestos({navigation}){

    // hooks
    const [descripcion, setDescripcion] = useState('');

    const pressHandler = async () => {
        if( descripcion.length <=0  ){
            Alert.alert("SorBurgers", "Todos campo descripcion es requerido");
        }else{
            try{
                const respuesta = await fetch(ip.ip + "puestos/guardar",
                    {
                        method: 'POST',
                        headers:{
                            Accept: "application/json",
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            descripcion: descripcion
                        })
                    }
                );

                const json = await respuesta.json();
                console.log(json);
                Alert.alert("SorBurgers", "Nuevo Puesto Guardado Correctamente");
                navigation.navigate('PuestosMenu');
            }
            catch(err){
                console.log(err);
            }
        }
    }
    const pressCancel = async () => {
        navigation.navigate('PuestosMenu');
    }

     return(
        <View style={styles.container}>
            <View style={styles.signup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Guardar un Puesto</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        
                        <TextInput
                         
                        style={styles.comings}
                        placeholder="Puestos"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setDescripcion(val)}
                        />

                        
                    </View>    
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Guardar" onPress={pressHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Cancelar" onPress={pressCancel} />
                        </View>
                    </View>
                   
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
    pickers:{
        alignContent:"center"
    },
    signup:{
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "15%"
    },
    titleContainer:{
        padding: 25,
        alignItems: "stretch",
        justifyContent: "center",
        height:100
    },
    title:{
        color: "#E4DBD9",
        fontSize: 36,
        textAlign: "center"
    },
    inputsContainer:{
        marginTop: "5%",
        padding: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end"
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
    buttonContainer:{
        padding: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10%",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    button:{
        margin: 10
    },
    terms:{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 15,
        paddingBottom: 20,
        width: "100%"
    },
    label:{
        color: "#E4DBD9",
        padding: 20,
        alignItems: "stretch",
        textAlign: "left",
        fontSize: 20
    }
})