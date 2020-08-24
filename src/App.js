import React, { useState, useEffect } from 'react';
import './App.css';
import Screen from './screen';
import Button from './button';


function App() {

  const [screenContent, setScreenContent] = useState('');
  const [expression, setExpression] = useState('');

  useEffect(() => {
    const readableExpression = expression.replace(/\*{2}/g, "^").replace(/\*/g, "x").replace(/\//g, "÷");

    setScreenContent(readableExpression);
  }, [expression])

  function express(value) {
    const newExpression = expression.replace(/Error/, '');

    setExpression(newExpression + value);
  }

  function clear() {
    setExpression('');
  }

  function calculate() {
    var newExpression = expression;

      //replacing #(# for #*( & #)# for #)*#
    var foundLeft = newExpression.match(/[0-9]\(/) || [];
    var foundRight = newExpression.match(/\)[0-9]/) || [];
    
    const found = [...foundLeft, ...foundRight];
    found.map(str => {
      newExpression = newExpression.replace(str, str[0] + "*" + str[1]);
    });

    

    try {
      var result = `${ eval(newExpression) }`;
    } catch {
      var result = "NaN";
    }
    

    if(result === "Infinity" || result === "NaN" || result === "-Infinity") {
      setExpression('Error');
    } else {
      setExpression(result);
    }
  }

  return (
    <div className='calculator'>

      <Screen screenContent={ screenContent } />

      <div className='buttons'>

        <div className='row'>
         <Button symbol='(' clickHandler={ () => express('(') }/>
         <Button symbol=')' clickHandler={ () => express(')') }/>
         <Button symbol='x<sup>y</sup>'  clickHandler={ () => express('**') }/>
         <Button symbol='Ac'  clickHandler={ clear }/>
        </div>

        <div className='row'>
         <Button symbol='1'  clickHandler={ () => express('1') }/>
         <Button symbol='2'  clickHandler={ () => express('2') }/>
         <Button symbol='3'  clickHandler={ () => express('3') }/>
         <Button symbol='÷'  clickHandler={ () => express('/') }/>
        </div>

        <div className='row'>
         <Button symbol='4'  clickHandler={ () => express('4') }/>
         <Button symbol='5' clickHandler={ () => express('5') }/>
         <Button symbol='6' clickHandler={ () => express('6') }/>
         <Button symbol='x' clickHandler={ () => express('*') }/>
        </div>

        <div className='row'>
         <Button symbol='7' clickHandler={ () => express('7') }/>
         <Button symbol='8' clickHandler={ () => express('8') }/>
         <Button symbol='9' clickHandler={ () => express('9') }/>
         <Button symbol='+' clickHandler={ () => express('+') }/>
        </div>

        <div className='row'>
         <Button symbol='.' clickHandler={ () => express('.') }/>
         <Button symbol='0' clickHandler={ () => express('0') }/>
         <Button symbol='=' clickHandler={ calculate }/>
         <Button symbol='-' clickHandler={ () => express('-') }/>
        </div>
        
      </div>

    </div>
  );
}

export default App;
