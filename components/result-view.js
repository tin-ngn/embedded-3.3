import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'

export default function ResultView(props) {
    const [person, iterations, timeTaken] = props.data
    return (
        <View style={styles.homeView}>
            {person.map((value, index) => {
                return <Text style={styles.textFont} key={value + Math.random() * 5}>{` x${index + 1}  = ${value}`}</Text>
            })}
            <Text style={styles.textFont}>
                {`Iterations = ${iterations}, Time taken = ${timeTaken.toFixed(2)} milliseconds`}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    homeView: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'wrap',
    },
    textFont: {
        fontSize: 22
    }
});