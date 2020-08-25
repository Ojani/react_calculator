import React, { useState, useEffect, memo } from 'react';
import './App.css';
import Screen from './screen';
import Button from './button';
import MemoryButton from './mem-controls';


function App() {

  const [memory, setMemory] = useState([]);
  const [screenContent, setScreenContent] = useState('');
  const [expression, setExpression] = useState('');
  const [memoryIndex, setMemoryIndex] = useState(0);

  useEffect(() => {
    const readableExpression = expression.replace(/\*{2}/g, "^").replace(/\*/g, "x").replace(/\//g, "÷");
    setScreenContent(readableExpression);

  }, [expression]);

  function express(value) {
    if(memoryIndex !== memory.length) {
      setMemoryIndex(memory.length);
    }
    const newExpression = expression.replace(/Error/, '');

    setExpression(newExpression + value);
  }

  function clear() {
    setExpression('');

    if(memoryIndex !== memory.length) {
      setMemoryIndex(memory.length);
    }
  }

  // Going back or forth into calculator memory
  function navigateMemory(jumps) {
    var newIndex = memoryIndex +jumps;
    setMemoryIndex(newIndex);

    var currentMemo = memory[newIndex];
    setExpression(currentMemo.expression);
  }

  function calculate() {
    // doing nothing if there is nothing to express
    if(!expression) return;

    //updating calculator memory.
    setMemory(memory => {
      var newMemory;

      //removing oldest memory item to keep it 25 items or below
      if(memory.length >= 25) {
        newMemory = memory.slice(1, memory.length);
      } else {
        newMemory = [ ...memory ];
      }

      return [...newMemory, {
        expression: expression
      }];
    });

    var newExpression = expression;

    //replacing #(# for #*( & #)# for #)*#
    var foundLeft = newExpression.match(/[0-9]\(/g) || [];
    var foundRight = newExpression.match(/\)[0-9]/g) || [];
    var touchingParentheses = newExpression.match(/\)\(/g) || [];
    
    const found = [...foundLeft, ...foundRight, ...touchingParentheses];
    found.forEach(str => {
      newExpression = newExpression.replace(str, str[0] + "*" + str[1]);
    });

    
    console.log(`Unparsed expression: \n ${ newExpression }`);

    var result;
    try {
      result = `${ eval(newExpression) }`;
    } catch {
      result = "NaN";
    }
    
    if(result === "Infinity" || result === "NaN" || result === "-Infinity") {
      setExpression('Error');
    } else {
      setExpression(result);
    }
    setMemoryIndex(memory.length +1);
  }

  return (
    <div className='calculator'>

      <div className='screen-wrapper'>
        <Screen screenContent={ screenContent } memory={ memory } />
        <MemoryButton memoryIndex={ memoryIndex } memoryLength={ memory.length } prevClickHandeler={ () => navigateMemory(-1) } nextClickHandeler={ () => navigateMemory(1) } />
      </div>

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
