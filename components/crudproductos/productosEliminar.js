import React, {useState,useEffect} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert,BackHandler} from 'react-native';
const ip = require('../../ip/ip');

export default function EliminarProducto ({route, navigation}) {
    
    const {id}= route.params; 
    const [nombre, setNombre] = useState('');
    const [descripcionProducto, setDescripcionProducto] = useState('');
    const [precio, setPrecio] = useState(0.00);
    const [recetumId, setRecetumId] = useState(0);
    const [ejecucion, setEjecucion] = useState(null);

    if(ejecucion==null){
        try {
            const response = fetch(ip.ip + "productos/editar?id=" + id, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                    setRecetumId(json.recetumId);
                    setNombre(json.nombre);
                    setDescripcionProducto(json.descripcionProducto);
                    setPrecio(json.precio);
                    console.log(json);   
                    parseFloat(precio);
                    parseInt(recetumId);
                });  
            setEjecucion(false);
        } 
        catch (error) {
            setEjecucion(false);
            console.error(error);
        }
        setEjecucion(false);  
    }

    const presseliminar = async () => {
        if(!id){
            Alert.alert("SorBurgers","Escriba el id a eliminar");
        }
        else{
            try {
                const response = await fetch(ip.ip + "productos/eliminar?id=" + id,
                {
                    method: 'DELETE',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                console.log(data.msj);
                Alert.alert("SorBurgers",data.msj);
            } catch (error) {
                console.error(error);
            }

        }
        Alert.alert("SorBurgers", "Producto Eliminado Correctamente");
        navigation.navigate('ProductosMenu');
    }
    
    return(
        
        <View style={styles.container}>
            <View style={styles.signup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Eliminar un Producto</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        <TextInput style={styles.comings} editable={false} defaultValue={nombre}/>

                        <TextInput style={styles.comings} editable={false} defaultValue={descripcionProducto}/>      
                        
                    </View>    
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Eliminar" onPress={presseliminar} />
                        </View>
                    </View>
                   
                </View>
            </View>
        </View>

    );
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
