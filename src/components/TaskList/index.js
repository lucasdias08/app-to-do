import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function TaskList({ data, handleDelete }){
    return(
        <Animatable.View
          style={styles.container}
          animation="bounceIn"
          useNativeDriver>
              
            <AnimatedBtn
              useNativeDriver
              animation="bounceInUp"  
              duration={1500}
              onPress={ () => {handleDelete(data)}}
                >
                <Ionicons name="md-checkmark-circle" size={30} color="#121212"/>
            </AnimatedBtn>
            <View>
                <Text style={styles.task}> {data.task} </Text>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3
        }       
    },
    task: {
        color: "#121212",
        fontSize: 30,
        paddingLeft: 8,
        paddingRight: 20
    }
});