import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Inicio({navigation}){    
    
    return(
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={{color: "#000"}}>Aquí iría el logo de SorBurgers</Text>
            </View>

            <View style={styles.optionsContainer}>
                <View style={styles.options}>
                    <Text style={styles.text}>Mi perfil</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                        <MaterialCommunityIcons name="face" color="#E4DBD9" size={32}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.options}>
                    <Text style={styles.text}>Mi cuenta</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('MiCuenta')}>
                        <MaterialCommunityIcons name="account" color="#E4DBD9" size={32}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.options}>
                    <Text style={styles.text}>Eliminar mi cuenta</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EliminarCuenta')}>
                        <MaterialCommunityIcons name="trash-can" color="#E4DBD9" size={32}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.options}>
                    <Text style={styles.text}>Salir</Text>
                    <TouchableOpacity>
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
    logoContainer:{
        marginTop: "15%",
        backgroundColor: "#E4DBD9",
        padding: 20,
        borderRadius: 10,
        height: 140,
        width: 310,
        marginBottom: "10%",
        alignItems: "center",
        justifyContent: "center"
    },
    optionsContainer:{
        flex: 1,
        width: "100%",
        paddingHorizontal: "12%",
        paddingTop: "10%",
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