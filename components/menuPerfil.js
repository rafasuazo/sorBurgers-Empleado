import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import logo from "../assets/SorBurgers.jpg";

export default function Inicio({navigation}){ 
    
    const pressConfirm = () => {

        return Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro que quieres salir de la aplicación?",
            [
                {
                    text: "Sí",
                    onPress: () => BackHandler.exitApp()
                },
                {
                    text: "No",
                    style: "cancel"
                }
            ],
        )
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                    <Image source={logo} style={styles.image}/>
                </View>

            <View style={styles.optionsContainer}>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Perfil')}>
                        <Text style={styles.text}>Mi perfil</Text>
                        <MaterialCommunityIcons name="face" color="#E4DBD9" size={32}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.options}>
                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('MiCuenta')}>
                        <Text style={styles.text}>Mi cuenta</Text>
                        <MaterialCommunityIcons name="account" color="#E4DBD9" size={32}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.options}>
                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('EliminarCuenta')}>
                        <Text style={styles.text}>Eliminar mi cuenta</Text>
                        <MaterialCommunityIcons name="trash-can" color="#E4DBD9" size={32}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.options}>
                    <TouchableOpacity style={styles.touch} onPress={pressConfirm}>
                        <Text style={styles.text}>Salir</Text>
                        <MaterialCommunityIcons name="logout" color="#E4DBD9" size={32}/>
                    </TouchableOpacity>
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
    imgContainer:{
        marginTop: "5%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 180,
        width: 310,
        marginBottom: "5%",
        alignItems: "center",
        justifyContent: "center"
    },
    image:{
        height: 200,
        width: 200,
        borderRadius: 10,
        resizeMode: "contain"
    },
    optionsContainer:{
        flex: 1,
        width: "100%",
        paddingHorizontal: "12%",
        paddingTop: "10%",
    },
    touch:{
        flex: 1,
        flexDirection: "row"
    },
    options:{
        flexDirection: "row",
        marginBottom: "10%",
        alignItems: "center"
    },
    text:{
        flex: 1,
        fontSize: 18,
        color: "#6E93D6"
    }
})