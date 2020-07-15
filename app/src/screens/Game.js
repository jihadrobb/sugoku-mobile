import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, Button, Alert, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoard, setBoard, encodeParams } from '../store/actions/boardAction';
import CountDown from 'react-native-countdown-component';

export default ({ route, navigation }) => {
    const { name, difficulty } = route.params;
    const { board, filled, solution } = useSelector(state => state.boardReducer);
    const [status, setStatus] = useState('unsolved');
    const time = 10;
    const dispatch = useDispatch();

    function settingTime() {
        switch(difficulty){
            case 'easy':
                return 600;
            case 'medium':
                return 900;
            case 'hard':
                return 1200;
            default:
                return 1000;
        }
    }
    
    useEffect(() => {
        dispatch(fetchBoard(difficulty));
    }, []);
    
    const validate = () => {
        const url = 'https://sugoku.herokuapp.com';
        fetch(`${url}/validate`, {
          method: 'POST',
          body: encodeParams({ board }),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(({ status }) => {
            setStatus(status);
            Alert.alert('Sudoku checked', status);
        })
        .catch(console.warn)
    };
    const solve = () => {
        dispatch(setBoard(solution));
    };
    const handleChange = (row, col, text) => {
        let newBoard = JSON.parse(JSON.stringify(board));
        if(isNaN(Number(text))){
            Alert.alert('Only input number!');
            newBoard[row][col] = 0;
        } else {
            newBoard[row][col] = Number(text);
        }
        dispatch(setBoard(newBoard));
    };
    const handleFinish = () => {
        navigation.navigate('Finish', {
            name,
            difficulty,
            status,
        });
    };
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginBottom: 20, marginTop: 20 }}>
                <Text style={styles.title}>SUGOKU</Text>
                <Text>Hello, {name}. Difficulty: {difficulty[0].toUpperCase() + difficulty.slice(1)}</Text>
            </SafeAreaView>
            <CountDown
                until={time}
                onFinish={handleFinish}
                onPress={() => Alert.alert('Time\'s ticking', 'better thinking :)')}
                timeToShow={['M', 'S']}
                timeLabels={{m: 'Minutes', s: 'Seconds'}}
                size={20}
            />
            <View style={styles.box}>
                {board.map((arr, row) => {
                return <View style={styles.row} key={row}>{arr.map((el, col) => {
                    if(filled[row][col]) { //filled[row][col]
                        return <TextInput 
                        editable={true} 
                        style={[styles.filled, styles.unfilled]} 
                        key={col}
                        maxLength={1}
                        keyboardType={'numeric'}
                        value={board[row][col] === 0 ? '' : board[row][col].toString()}
                        onChangeText={(text) => handleChange(row, col, text)} />
                    } else {
                        return <TextInput editable={false} 
                        style={styles.filled}
                        value={board[row][col].toString()}
                        key={col}/>
                    }
                })}</View>
                })}
            </View>
            <Text style={{ alignSelf: 'center' }}>Click validate to check your work, then click Finish</Text>
            <View style={styles.buttonBox}>
                <View style={styles.button}>
                    <Button
                    title="Cheat"
                    color='#fcf9f7'
                    onPress={solve}
                    />
                </View>
                <View style={[styles.button, styles.button2]}>
                    <Button
                    title="Validate"
                    color='#fa7268'
                    onPress={validate}
                    />
                </View>
                <View style={[styles.button, styles.button3]}>
                    <Button 
                    title={status === 'solved' ? 'Finish' : 'GiveUp'}
                    color='#ffffff'
                    onPress={handleFinish}
                    />
                </View>
            </View>
        </View>
    )
}

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignContent: "center",
      justifyContent: "center",
      padding: 24
    },
    title: {
      marginBottom: 10,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    },
    box: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    row: {
      flexDirection: 'row',
    },
    filled: {
      width:(width-40) / 9,
      borderWidth: 1,
      borderColor: '#20232a',
      textAlign: 'center',
      padding: 12,
      backgroundColor: '#bbf8df'
    },
    unfilled: {
      backgroundColor: '#ffffff'
    },
    buttonBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    button: {
        padding: 1,
        backgroundColor: '#d4af37',
        marginHorizontal: 5,
    },
    button2: {
        backgroundColor: '#811622',
    },
    button3: {
        backgroundColor: '#000000',
    },
  });