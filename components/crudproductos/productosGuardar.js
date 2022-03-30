import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
const ip = require('../../ip/ip');

export default function GuardarProducto({navigation}){

    // hooks
    const [nombre, setNombre] = useState('');
    const [descripcionProducto, setDescripcionProducto] = useState('');
    const [precio, setPrecio] = useState('');
    const [recetumId, setRecetumId] = useState('');

    const terms = "Al usar SorBurgers-app acepta nuestros términos y condiciones."; 

    const [info, setInfo] = useState([]);
    const [ejecucion, setEjecucion] = useState(null);

    if(ejecucion==null){
        try {
            const response = fetch(ip.ip + "recetas/", {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                    setInfo(json);
                    console.log(info);   
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
        if(nombre.length <= 0 || descripcionProducto.length <=0 || precio.length <= 0 ){
            Alert.alert("SorBurgers", "Todos los campos son requeridos");
        }else{
            try{
                const respuesta = await fetch(ip.ip + "productos/guardar",
                    {
                        method: 'POST',
                        headers:{
                            Accept: "application/json",
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            recetumId: recetumId,
                            nombre: nombre,
                            descripcionProducto: descripcionProducto,
                            precio: precio
                        })
                    }
                );

                const json = await respuesta.json();
                console.log(json);
                Alert.alert("SorBurgers", "Nuevo Producto Guardado Correctamente");
                navigation.navigate('ProductosMenu');
            }
            catch(err){
                console.log(err);
            }
        }
    }
    const pressCancel = async () => {
        navigation.navigate('ProductosMenu');
    }

     return(
        <View style={styles.container}>
            <View style={styles.signup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Guardar un Producto</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Nombre de Producto"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setNombre(val)}
                        />

                        <TextInput
                         
                        style={styles.comings}
                        placeholder="Descripcion del Producto"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setDescripcionProducto(val)}
                        />

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Precio del Producto"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setPrecio(val)}
                        keyboardType={"phone-pad"}
                        />

                        <Text style={styles.label}>Seleccione una receta</Text>
                        <Picker alignItems='center'
                            selectedValue={recetumId}
                            style={{ height: 50, width: 300 }}
                            onValueChange={(itemValue) => setRecetumId(itemValue)}
                        >
                            <Picker.Item label="Receta 1" value="1" />
                            <Picker.Item label="Receta 2" value="2" />
                            <Picker.Item label="Receta 3" value="3" />
                            <Picker.Item label="Receta 4" value="4" />
                            <Picker.Item label="Receta 5" value="5" />
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