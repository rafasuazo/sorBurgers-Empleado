import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EliminarCuenta({navigation}){

    // hooks
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [correo, setCorreo] = useState('');
    const [isLoading, setLoading] = useState(true);

    const getCliente = async () => {

        let cliente = JSON.parse(await AsyncStorage.getItem('cliente'));

        if(!cliente){
            console.log("Usuario no autenticado");
            setId(null)   
        }
        else{

            try{

                setId(cliente.info.cliente.id)            
                await fetch('http://192.168.0.9:3003/api/clientes/editar?id=' + id);
                setNombre(cliente.info.cliente.nombre);
                setApellido(cliente.info.cliente.apellido);
                setTelefono(cliente.info.cliente.telefono);
                setFechaNacimiento(cliente.info.cliente.fechaNacimiento);
                setCorreo(cliente.info.correo);
            }   
            catch(err){
                console.log(err);
            }   
            finally{
                setLoading(false);
            }          
        }
    }
    
    useEffect(() => {
        getCliente();
    }, [])

    const pressDelete = async () => {

        try{

            const respuesta = await fetch('http://192.168.0.183:3003/api/usuarios/eliminar?id=' + id,
            {
                method: 'DELETE',
                headers:{
                    Accept: "application/json",
                    'Content-Type': "application/json"
                }
            });

            const json = await respuesta.json();
            console.log(json);

            Alert.alert("SorBurgers", json.msj);
            navigation.navigate('Login');
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.delete}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Eliminar mi cuenta</Text>
                </View>
            </View>

            {isLoading ? <ActivityIndicator /> : (
                <View style={styles.deleteContainer}>
                    <View style={styles.form}>
                        <Text style={styles.labelForm}>Nombre</Text>
                        <TextInput
                        
                        defaultValue={nombre}
                        editable={false}
                        style={styles.comings}
                        />

                        <Text style={styles.labelForm}>Apellido</Text>
                        <TextInput
                        
                        defaultValue={apellido}
                        editable={false}
                        style={styles.comings}
                        />

                        <Text style={styles.labelForm}>Teléfono</Text>
                        <TextInput
                        
                        defaultValue={telefono}
                        editable={false}
                        style={styles.comings}
                        />

                        <Text style={styles.labelForm}>Fecha de Nacimiento</Text>
                        <TextInput
                        
                        defaultValue={fechaNacimiento}
                        editable={false}
                        style={styles.comings}
                        />

                        <Text style={styles.labelForm}>Correo</Text>
                        <TextInput
                        
                        defaultValue={correo}
                        editable={false}
                        style={styles.comings}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Eliminar" onPress={pressDelete}/>
                        </View>
                    </View>

                </View>
            )}
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
    delete:{
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    titleContainer:{
        padding: 25
    },
    title:{
        color: "#6E93D6",
        fontSize: 32
    },
    deleteContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    form:{
        padding: 20
    },
    labelForm:{
        color: "#E4DBD9",
        marginStart: 20,
        marginBottom: 5,
        fontSize: 18
    },
    comings:{
        width: 300,
        padding: 15,
        marginBottom: 10,
        fontSize: 18,
        color: "#E4DBD9",
        backgroundColor: "#2F4C58",
        borderRadius: 10,
        marginStart: 15
    },
    buttonContainer:{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    button:{
        margin: 10
    }
})