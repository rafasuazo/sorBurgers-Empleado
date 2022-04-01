import React, {useState,useEffect} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert,BackHandler} from 'react-native';
const ip = require('../../ip/ip');


export default function ModificarProveedores ({route, navigation}){
    
    const {id}= route.params; 
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
    const pressModificar = async () => {
        if(!id){
            Alert.alert("SorBurgers","Escriba el id a Actualizar y todos campos requeridos");
        }
        else{
            try {
                const respuesta = await fetch(ip.ip + "proveedores/modificar?id=" + id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            nombreProveedor: nombreProveedor,
                            empresa: empresa,
                            direccion: direccion,
                            telefono: telefono,
                            correo: correo
                    })
                });
                const json = await respuesta.json();
                console.log(json);
                Alert.alert("SorBurgers", "Proveedor Modificado Correctamente");
                navigation.navigate('ProveedoresMenu');
            } catch (error) {
                console.error(error);
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
                <Text style={styles.title}>Modificar un Proveedor</Text>
            </View>

            <View style={styles.inputsContainer}>
                <View style={styles.controls}>
                    <TextInput
                    
                    style={styles.comings}
                    placeholder="Nombre del Proveedor"
                    placeholderTextColor={"#E4DBD9"}
                    defaultValue={nombreProveedor}
                    onChangeText={(val) => setnombreProveedor(val)}
                    />

                    <TextInput
                     
                    style={styles.comings}
                    placeholder="Nombre de la Empresa"
                    placeholderTextColor={"#E4DBD9"}
                    defaultValue={empresa}
                    onChangeText={(val) => setempresa(val)}
                    />
                    
                    <TextInput
                     
                     style={styles.comings}
                     placeholder="Direccion de la Empresa"
                     placeholderTextColor={"#E4DBD9"}
                     defaultValue={direccion}
                     onChangeText={(val) => setdireccion(val)}
                     />
                    <TextInput
                    
                    style={styles.comings}
                    placeholder="Telefono del Proveedor"
                    placeholderTextColor={"#E4DBD9"}
                    defaultValue={telefono}
                    onChangeText={(val) => settelefono(val)}
                    keyboardType={"phone-pad"}
                    />

                    <TextInput
                     
                     style={styles.comings}
                     placeholder="Correo de la Empresa"
                     placeholderTextColor={"#E4DBD9"}
                     defaultValue={correo}
                     onChangeText={(val) => setcorreo(val)}
                     />

                    </View>    
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Modificar" onPress={pressModificar} />
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