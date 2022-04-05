import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
const ip = require('../../ip/ip');

export default function GuardarIngrediente({navigation}){

    // hooks
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [proveedoreId, setProveedoreId] = useState('');

    const pressHandler = async () => {
        if(nombre.length <= 0 || descripcion.length <=0 || precioCompra.length <= 0 || cantidad.length <= 0 ){
            Alert.alert("SorBurgers", "Todos los campos son requeridos");
        }else{
            try{
                const respuesta = await fetch(ip.ip + "ingredientes/guardar",
                    {
                        method: 'POST',
                        headers:{
                            Accept: "application/json",
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            proveedoreId: proveedoreId,
                            nombre: nombre,
                            descripcion: descripcion,
                            precioCompra: precioCompra
                        })
                    }
                );

                const json = await respuesta.json();
                console.log(json);
                Alert.alert("SorBurgers", "Nuevo Ingrediente Guardado Correctamente");
                navigation.navigate('IngredientesMenu');
            }
            catch(err){
                console.log(err);
            }
        }
    }
    const pressCancel = async () => {
        navigation.navigate('IngredientesMenu');
    }

     return(
        <View style={styles.container}>
            <View style={styles.signup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Guardar un Ingrediente</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Nombre de Ingrediente"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setNombre(val)}
                        />

                        <TextInput
                         
                        style={styles.comings}
                        placeholder="Descripcion del Ingrediente"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setDescripcion(val)}
                        />

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Precio del Ingrediente"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setPrecioCompra(val)}
                        keyboardType={"phone-pad"}
                        />

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Cantidad del Ingrediente"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setCantidad(val)}
                        keyboardType={"phone-pad"}
                        />

                        <Text style={styles.label}>Seleccione un Proveedor</Text>
                        <Picker alignItems='center'
                            selectedValue={proveedoreId}
                            style={{ height: 50, width: 300, color: "#fff" }}
                            onValueChange={(itemValue) => setProveedoreId(itemValue)}
                        >
                            <Picker.Item label="Diprova" value="1" />
                            <Picker.Item label="La Colonia" value="2" />
                            <Picker.Item label="Walmart" value="3" />
                            <Picker.Item label="Nutriboom" value="4" />
                            <Picker.Item label="Despensa Familiar" value="5"/>
                        </Picker>
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
        justifyContent: "flex-start"
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
        marginTop: 15,
        alignItems: "stretch",
        textAlign: "left",
        fontSize: 20
    }
})