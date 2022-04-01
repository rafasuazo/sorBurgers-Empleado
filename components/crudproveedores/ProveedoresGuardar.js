import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
const ip = require('../../ip/ip');

export default function GuardarProveedores({navigation}){

    // hooks
    const [nombreProveedor, setnombreProveedor] = useState('');
    const [empresa, setempresa] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, settelefono] = useState('');
    const [correo, setcorreo] = useState('');

    const pressHandler = async () => {
        if(nombreProveedor.length <= 0 || empresa.length <=0 || direccion.length <= 0 || telefono.length <= 0|| correo.length <= 0){
            Alert.alert("SorBurgers", "Todos los campos son requeridos");
        }else{
            try{
                console.log(nombreProveedor);
                const respuesta = await fetch(ip.ip + "proveedores/guardar",
                    {
                        method: 'POST',
                        headers:{
                            Accept: "application/json",
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            nombreProveedor: nombreProveedor,
                            empresa: empresa,
                            direccion: direccion,
                            telefono: telefono,
                            correo: correo
                        })
                    }
                );

                const json = await respuesta.json();
                console.log(json);
                Alert.alert("SorBurgers", "Nuevo Proveedor Guardado Correctamente");
                /*navigation.navigate('ProveedoresMenu');*/
            }
            catch(err){
                console.log(err);
            }
        }
    }
    const pressCancel = async () => {
        navigation.navigate('ProveedoresMenu');
    }

     return(
        <View style={styles.container}>
            <View style={styles.signup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Guardar un Proveedor</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Nombre del Proveedor"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setnombreProveedor(val)}
                        />

                        <TextInput
                         
                        style={styles.comings}
                        placeholder="Nombre de la Empresa"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setempresa(val)}
                        />
                        
                        <TextInput
                         
                         style={styles.comings}
                         placeholder="Direccion de la Empresa"
                         placeholderTextColor={"#E4DBD9"}
                         onChangeText={(val) => setdireccion(val)}
                         />
                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Telefono del Proveedor"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => settelefono(val)}
                        keyboardType={"phone-pad"}
                        />

                        <TextInput
                         
                         style={styles.comings}
                         placeholder="Correo de la Empresa"
                         placeholderTextColor={"#E4DBD9"}
                         onChangeText={(val) => setcorreo(val)}
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