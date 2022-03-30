import React, {useState,useEffect} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert,BackHandler} from 'react-native';
const ip = require('../../ip/ip');

export default function EliminarProveedores ({route, navigation}) {
    
    const {id}= route.params; 

    const terms = "Al usar SorBurgers-app acepta nuestros términos y condiciones."; 
    const [nombreProveedor, setnombreProveedor] = useState('');
    const [empresa, setempresa] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, settelefono] = useState('');
    const [correo, setcorreo] = useState('');
    const [ejecucion, setEjecucion] = useState(null);

    if(ejecucion==null){
        try {
            const response = fetch(ip.ip + "proveedores/editar?id=" + id, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                    setnombreProveedor(json.nombreProveedor);
                    setempresa(json.empresa);
                    setdireccion(json.direccion);
                    settelefono(json.telefono);
                    setcorreo(json.correo);
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

    const presseliminar = async () => {
        if(!id){
            Alert.alert("SorBurgers","Escriba el id a eliminar");
        }
        else{
            try {
                const response = await fetch(ip.ip + "proveedores/eliminar?id=" + id,
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
        Alert.alert("SorBurgers", "Proveedor Eliminado Correctamente");
        navigation.navigate('ProveedoresMenu');
    }
    
    return(
        
        <View style={styles.container}>
            <View style={styles.signup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Eliminar un Proveedor</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        <TextInput style={styles.comings} editable={false} defaultValue={nombreProveedor}/>
                        <TextInput style={styles.comings} editable={false} defaultValue={empresa}/>
                        <TextInput style={styles.comings} editable={false} defaultValue={direccion}/>
                        <TextInput style={styles.comings} editable={false} defaultValue={telefono}/>
                        <TextInput style={styles.comings} editable={false} defaultValue={correo}/>                        
                    </View>    
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Eliminar" onPress={presseliminar} />
                        </View>
                    </View>
                   
                </View>

                <View style={styles.terms}>
                    <Text style={{color: "#E4D8D9", textAlign: "center"}}>{terms}</Text>
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
