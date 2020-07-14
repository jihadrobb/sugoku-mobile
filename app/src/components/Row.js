import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default (props) => {
    const [filled, setFilled] = useState();
    useEffect(() => {
        let arr = [];
        for (let i = 0; i < props.row.length; i++) {
            arr.push(props.row[i] === 0)
        }
        setFilled(arr);
    }, [])
    return (
        <View>{props.map((el, idx) => {
            return <TextInput 
            editable={filled[idx]}
            style={filled[idx] ? [styles.filled, styles.unfilled] : styles.filled}
            >{el === 0? '' : el}</TextInput>
        })}</View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    filled: {
        borderWidth: 1,
        borderColor: '#20232a',
        textAlign: 'center',
        padding: 12,
        backgroundColor: '#bbf8df'
    },
    unfilled: {
        backgroundColor: '#ffffff'
    }
});