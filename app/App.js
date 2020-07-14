import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [board, setBoard] = useState([]);
  const [filled, setFilled] = useState([]);

  useEffect(() => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
    .then(res => res.json())
    .then(({board}) => setBoard(board))
    .catch(console.log);
  }, [])

  useEffect(() => {
    checkFilled();
  }, [board])

  const checkFilled = () => {
    let temp = [];
    for (let i = 0; i < board.length; i++) {
      let temp2 = [];
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          // console.log(board[i][j], '<<< ini nilai dr index ', i, j)
          temp2.push(false)
        } else {
          temp2.push(true)
        }
      }
      temp.push(temp2);
    }
    setFilled(temp);
  }
  const handleChange = (i, j, input) => {
    // console.log(i, '<<< i');
    // console.log(j, '<<< j');
    // console.log(board[i][j], '<<< angka board');
    // console.log(input, '<<< text nih')
    let newBoard = [...board];
    newBoard[i][j] = Number(input);
    setBoard(newBoard);
    // console.log(board[i][j], '<<< angka board sekarang');
    
  }
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  const handleCheck = () => {
    // alert('You Clicked');
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(res => res.json())
    .then(({ status })=> Alert.alert('Sudoku checked', status))
    .catch(console.warn)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>SUGOKU</Text>
      </SafeAreaView>
      <View style={styles.box}>
        {board.map((arr, row) => {
          // flex nya ke kananin buat row
          return <View style={styles.row} key={row}>{arr.map((el, col) => {
            if(el !== 0) {
              return <TextInput editable={false} 
              style={styles.filled}
              key={col}>{el}</TextInput>
            } else {
              return <TextInput editable={true} 
              style={[styles.filled, styles.unfilled]} 
              key={col}
              onChangeText={text => handleChange(row, col, text)}>{''}</TextInput>
            }
          })}</View>
        })}
      </View>
        <Button
        title="Check"
        color='#f90909'
        onPress={handleCheck}/>
    </View>
  );
}

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    
  },
  row: {
    // flexDirection: 'row',
    flexWrap: 'wrap',
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
