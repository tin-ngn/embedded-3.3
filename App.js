/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements'
import InputView from "./components/input-view";
import ResultView from "./components/result-view";
import { geneticAlgorithm } from "./genetic_algorithm/genetic-algorithm"

const App: () => React$Node = () => {
  const [x, setX] = useState(new Array(5))
  const [res, setRes] = useState([])
  useEffect(() => {
    setRes(geneticAlgorithm(x.slice()))
  }, [x])
  return (
    <>
      <View>
        <Header
            leftComponent={{ text: 'LAB 3.3', style: { color: '#fff' } }}
            centerComponent={{ text: 'NHUEN', style: { color: '#fff' } }}
        />
        <InputView setX={setX} />
        {res.length ?  <ResultView data={res}/> : <View/>}
      </View>
    </>
  );
};

export default App;
