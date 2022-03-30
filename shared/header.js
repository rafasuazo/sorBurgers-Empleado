import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Header({title}){

    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    headerText: {
        fontWeight: "700",
        fontSize: 20,
        color: "#E4DBD9"
    }
})