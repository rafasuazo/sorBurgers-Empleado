import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaFrame } from "react-native-safe-area-context";
const ip = require('../../ip/ip');

export default function ModificarCliente({route, navigation}){

    const {id}= route.params;
    // hooks
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');

    const [ejecucion, setEjecucion] = useState(null);
    if(ejecucion==null){
        try {
            const response = fetch(ip.ip + "clientes/editar?id=" + id, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                    setNombre(json.nombre);
                    setApellido(json.apellido);
                    setTelefono(json.telefono);
                    setFechaNacimiento(json.fechaNacimiento);
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

    const pressHandler = async () => {
        
        if(nombre.length <= 0 || apellido.length <=0 || telefono.length <= 0 ){
            Alert.alert("SorBurgers","Escriba el id a Actualizar y todos campos requeridos");
        }
        else{
            try {
                const respuesta = await fetch(ip.ip + "clientes/modificar?id=" + id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        apellido: apellido,
                        telefono: telefono,
                        fechaNacimiento : fechaNacimiento
                    })
                });
                const json = await respuesta.json();
                console.log(json);
                Alert.alert("SorBurgers", "Cliente Modificado Correctamente");
                navigation.navigate('ClientesMenu');
            } catch (error) {
                console.error(error);
            }
        }
    }
    const pressCancel = async () => {
        navigation.navigate('ClientesMenu');
    }

     return(
        <View style={styles.container}>
            <View style={styles.signup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Modificar un Cliente</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Nombre del Cliente"
                        placeholderTextColor={"#E4DBD9"}
                        defaultValue={nombre}
                        onChangeText={(val) => setNombre(val)}
                        />

                        <TextInput
                         
                        style={styles.comings}
                        placeholder="Apellido del Cliente"
                        placeholderTextColor={"#E4DBD9"}
                        defaultValue={apellido}
                        onChangeText={(val) => setApellido(val)}
                        />

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Telefono del Cliente"
                        placeholderTextColor={"#E4DBD9"}
                        defaultValue={''+telefono}
                        onChangeText={(val) => setTelefono(val)}
                        />

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Fecha de nacimiento"
                        placeholderTextColor={"#E4DBD9"}
                        defaultValue={''+fechaNacimiento}
                        onChangeText={(val) => setFechaNacimiento(val)}
                        />

                    </View>    
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Modificar" onPress={pressHandler} />
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
        paddingTop: "2%"
    },
    titleContainer:{
        padding: 15,
        alignItems: "stretch",
        justifyContent: "center",
        height:70
    },
    title:{
        color: "#E4DBD9",
        fontSize: 28,
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