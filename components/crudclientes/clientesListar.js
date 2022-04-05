import React, {useState} from "react";
import { StyleSheet, View, Text, FlatList,Button, TextInput, Alert, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ip = require('../../ip/ip');

export default function ListarClientes({navigation}){

    const [info, setInfo] = useState([]);
    const [ejecucion, setEjecucion] = useState(null);

    if(ejecucion==null){
        try {
            const response = fetch(ip.ip + "clientes", {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                    setInfo(json);  
                });  
            setEjecucion(false);
        } 
        catch (error) {
            setEjecucion(false);
            console.error(error);
        }
        setEjecucion(false);  
    }

    const pressCancel = async () => {
        navigation.navigate('ClientesMenu');
    }

    return(
        <View style={styles.contenedor}>
            <View style={styles.contendorclientes}>
                <View style={styles.contenedortitulo}>
                    <Text style={styles.titulo}>Lista de Clientes</Text>
                </View>
                <View style={styles.flat}>
                    <FlatList numColumns={2} columnWrapperStyle={{justifyContent:"space-between"}}
                        data={info}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                            return(
                                <View style={styles.item}>
                                    <View style={styles.imagen}>
                                        <Image style={{flex:1, resizeMode:"cover",width: 100, height:90,}} source={require("../../assets/empleado.png")}
                                        />
                                    </View>
                                    <Text ># de Cliente: {item.id}</Text>
                                    <Text >Nombre: {item.nombre}</Text>
                                    <Text >Apellido: {item.apellido}</Text>
                                    <Text >Telefono: {item.telefono}</Text>
                                    <Text >Fecha de Nacimiento: {item.fechaNacimiento}</Text>
                                    <View style={styles.buttonContainer}>
                                        <View style={styles.button}>
                                            <Button title="Modificar" onPress={() => navigation.navigate("ClientesModificar", {id: item.id})}/>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}    

                    />
                </View>    
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Regresar" onPress={pressCancel} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#111B1E',
        width:'100%',
        height:'100%',
        alignItems:'center',
        fontSize:20
    },
    flat:{
        flex:1,
        paddingTop:1,
        paddingHorizontal:5,
        marginHorizontal:2
    },
    contendorclientes: {
        backgroundColor: '#111B1E',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },
    contenedortitulo: {
        padding: 25,
        alignItems: "stretch",
        backgroundColor: '#111B1E',
        justifyContent: "center",
        height:100
    },
    titulo: {
        backgroundColor: '#111B1E',
        justifyContent: 'center',
        alignContent:'center',
        textAlign:'center',
        fontSize: 30,
        color: '#fff',
        width:'100%'
    },
    contenedorbuscador: {
        margin: 10,
        padding: 5,
        flexDirection: 'column',
    },
    contenedorinfo: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 20,
        padding: 5,
    },
    buttonContainer:{
        alignItems: "center",
        justifyContent: "center"
    },
    imagen:{
        backgroundColor: "black",
        width: 80,
        height:70,
        borderRadius:10,
        marginBottom:10,
        alignItems:"center"
    },
    button:{
        margin: 5
    },
    item:{
        marginTop: 20,
        fontSize: 15,
        marginHorizontal: 1,
        marginVertical:0.1,
        padding:20,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        width: "80%",
        height:"85%",
        flexDirection: "column",
        alignItems: "center"
    }
})