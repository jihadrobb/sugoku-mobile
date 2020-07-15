import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert, Dimensions } from 'react-native';

export default ({navigation}) => {
    const [name, setName] = useState('');

    const handleNameChange = (text) => {
        setName(text);
    }
    const handleSubmit = (difficulty) => {
        if(!name) {
            Alert.alert('Input name first');
        } else {
            navigation.navigate('Game', {
                name,
                difficulty,
            });
            setName('');
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Text>Insert Name:</Text>
                <TextInput
                style={styles.nameBox}
                onChangeText={text => handleNameChange(text)}
                value={name}
                placeholder="e.g: Budi"
                />
            </View>
            <View style={styles.diffBox}>
                <Text>Select difficulty to play:</Text>
                <View style={styles.diffButtonBox}>
                    <View style={styles.easyButton}>
                        <Button
                        onPress={() => handleSubmit('easy')}
                        title="Easy"
                        color="#ffffff"
                        />
                    </View>
                    <View style={[styles.easyButton, styles.mediumButton]}>
                        <Button
                        onPress={() => handleSubmit('medium')}
                        title="Medium"
                        color="#000000"
                        />
                    </View>
                    <View style={[styles.easyButton, styles.hardButton]}>
                        <Button
                        onPress={() => handleSubmit('hard')}
                        title="Hard"
                        color="#ffffff"
                        />
                    </View>
                    <View style={[styles.easyButton, styles.randomButton]}>
                        <Button
                        onPress={() => handleSubmit('random')}
                        title="Random"
                        color="#841584"
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    nameContainer: {
        alignItems: "center"
    },
    nameBox: {
        width: width-150,
        marginTop: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
    },
    diffBox: {
        marginTop: 40,
        alignItems: "center",
    },
    diffButtonBox: {
        marginTop: 10,
        flexDirection: "row",
        borderColor: '#000000',
    },
    easyButton: {
        padding: 1,
        backgroundColor: '#0d47a1',
        marginHorizontal: 5,
    },
    mediumButton: {
        backgroundColor: '#fdfd96',
    },
    hardButton: {
        backgroundColor: '#ad1d2d',
    },
    randomButton: {
        backgroundColor: '#d4af37',
    }
});