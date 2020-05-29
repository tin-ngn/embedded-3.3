import React, { useState } from 'react'
import {StyleSheet, Text, TextInput, Button, View} from 'react-native'
import {Colors} from "react-native/Libraries/NewAppScreen";

export default function InputView(props) {
    const { values = ['x1', 'x2', 'x3', 'x4'], setX } = props
    const [vars, setVars] = useState(new Array(5))
    return (
        <View style={styles.homeView}>
            {values.map((value, index) => {
                return (
                    <View key={value} style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                        <TextInput
                            style={styles.textInput}
                            // placeholder="Type here to translate!"
                            onChangeText={value => {
                                const arr = vars.slice()
                                arr[index] = value
                                setVars(arr)
                            }}
                        />
                        <Text style={styles.textStyle}>
                            {` * ${value} ${index === 3 ? '= ' : '+ '}`}
                        </Text>
                    </View>
                )
            })}
            <TextInput
                style={styles.textInput}
                onChangeText={value => {
                    const arr = vars.slice()
                    arr[arr.length - 1] = value
                    setVars(arr)
                }}
            />
            <View style={styles.btn}>
                <Button
                    title="Calculate"
                    style={styles.btn}
                    onPress={() => setX(vars.slice())}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: "#e2e8f0",
        borderRadius: 6,
        height: 40,
        width: 40,
        color: "#20232a"
    },
    textStyle: {
        fontSize: 15
    },
    btn: {
        margin: 10
    },
    homeView: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'wrap',
    }
});
