import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaFrame } from "react-native-safe-area-context";
const ip = require('../../ip/ip');


export default function ModificarIngrediente({route, navigation}){
    
    const {id} = route.params;
    console.log(id);
    // hooks
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precioCompra, setPrecioCompra] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [proveedoreId, setProveedoreId] = useState(null);
    const terms = "Al usar SorBurgers-app acepta nuestros términos y condiciones."; 
    const [ejecucion, setEjecucion] = useState(null);
    if(ejecucion==null){
        try {
            const response = fetch(ip.ip + "ingredientes/editar?id=" + id, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                    setProveedoreId(json.proveedoreId);
                    setNombre(json.nombre);
                    setDescripcion(json.descripcion);
                    setPrecioCompra(json.precioCompra);
                    setCantidad(json.cantidad);
                    console.log(json);   
                    parseFloat(precioCompra);
                    parseInt(proveedoreId);
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
        
        if(nombre.length <= 0 || descripcion.length <= 0 || precioCompra.length <= 0 || cantidad.length <= 0){
            Alert.alert("SorBurgers","Escriba el id a Actualizar y todos campos requeridos");
        }
        else{
            try {
                const respuesta = await fetch(ip.ip + "ingredientes/modificar?id=" + id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        proveedoreId: proveedoreId,
                        nombre: nombre,
                        descripcion: descripcion,
                        precioCompra: precioCompra,
                        cantidad: cantidad
                    })
                });
                const json = await respuesta.json();
                console.log(json);
                Alert.alert("SorBurgers", "Producto Modificado Correctamente");
                navigation.navigate('IngredientesMenu');
            } catch (error) {
                console.error(error);
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
                    <Text style={styles.title}> Modificar un Ingrediente </Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Nombre de Ingrediente"
                        placeholderTextColor={"#E4DBD9"}
                        defaultValue={nombre}
                        onChangeText={(val) => setNombre(val)}
                        />

                        <TextInput
                         
                        style={styles.comings}
                        placeholder="Descripcion del Ingrediente"
                        placeholderTextColor={"#E4DBD9"}
                        defaultValue={descripcion}
                        onChangeText={(val) => setDescripcion(val)}
                        />

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Precio del Ingrediente"
                        placeholderTextColor={"#E4DBD9"}
                        defaultValue={''+precioCompra}
                        onChangeText={(val) => setPrecioCompra(val)}
                        keyboardType={"phone-pad"}
                        />

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Cantidad del Ingrediente"
                        placeholderTextColor={"#E4DBD9"}
                        defaultValue={""+cantidad}
                        onChangeText={(val) => setCantidad(val)}
                        keyboardType={"phone-pad"}
                        />

                        <Text style={styles.label}>Seleccione un Proveedor</Text>
                        <Picker alignItems='center'
                            selectedValue={proveedoreId}
                            style={{ height: 50, width: 300 }}
                            onValueChange={(itemValue) => setProveedoreId(itemValue)}
                        >
                            <Picker.Item label="Jetstereo" value="1" />
                            <Picker.Item label="Intur" value="2" />
                            <Picker.Item label="Diprova" value="3" />
                            <Picker.Item label="La Colonia" value="4" />
                            <Picker.Item label="Walmart" value="5" />
                            <Picker.Item label="Nutriboom" value="6" />
                            <Picker.Item label="Despensa Familiar" value="7"/>
                        </Picker>
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