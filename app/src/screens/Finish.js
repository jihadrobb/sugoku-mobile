import React from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions } from 'react-native';

export default ({ route, navigation }) => {
    const { name, difficulty, status } = route.params;

    const handleGoHome = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {status === 'solved' ?
                <Image
                style={styles.image}
                source={{ uri: 'https://clipart.info/images/ccovers/1547492564Congratulations-image-free-party.jpg'}}/>:
                <Image
                style={styles.image}
                source={{ uri: 'https://memegenerator.net/img/instances/81165649/too-bad-so-sad.jpg'}}/>
                }
                </View>
            {status === 'solved' ?
            <Text style={styles.message}>Congratulations {name}, you completed {difficulty} sugoku</Text>:
            <Text style={styles.message}>Too bad {name}, you failed the {difficulty} sugoku </Text>
            }
            <View style={styles.button}>
                <Button 
                color='#eaffff'
                onPress={handleGoHome}
                title="Go Home"/>
            </View>
        </View>
    )
}
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    imageContainer: {

    },
    image: {
        width: width-50,
        height: width-100,
    },
    message: {
        marginVertical: 30,
    },
    button: {
        backgroundColor: '#0d47a1',
    }
});