import React, { useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import Spline from 'cubic-spline'
import Plot from 'react-plotly.js';

function test() {
    const [num, setNum] = useState(1)
    const [arrX, setArrX] = useState([0])
    const [arrY, setArrY] = useState([0])
    const [graphX, setgraphX] = useState([0])
    const [graphY, setgraphY] = useState([0])
    const [input, setInput] = useState(0)
    const [result, setResult] = useState(0)

    const inputNum = (event) => {
        setNum(event.target.value)
    }

    const setAllArr = () => {
        let temp = [];
        for (let i = 0; i < num; i++) {
            temp.push(0)
        }
        setArrX(temp)
        setArrY(temp)
    }

    const inputArrY = (event, index) => {
        let temp = [...arrY];
        temp[index] = event.target.value
        setArrY(temp)
    }

    const inputArrX = (event, index) => {
        let temp = [...arrX];
        temp[index] = event.target.value
        setArrX(temp)
    }

    const inputI = (event) => {
        setInput(event.target.value)
    }
    const calculate = () => {
        // const Spline = require('cubic-spline');
        let tempX = [...arrX]
        let tempY = [...arrY]
        let X = []
        let Y = []
        for(let i=0;i<parseInt(num);i++){
            X[i] = parseFloat(tempX[i])
            Y[i] = parseFloat(tempY[i])
        }

        const spline = new Spline(X, Y);
        console.log(spline.at(parseFloat(input)))
        setResult(spline.at(parseFloat(input)))
        let plotX =[];
        let plotY =[];
        for(let i=X[0];i<X[X.length-1];i+=0.01){
            plotY.push(spline.at(parseFloat(i)))
            plotX.push(i)
        }
        setgraphX(plotX)
        setgraphY(plotY)

    }

    
    return (
        <Container>
            <h6>Spline test</h6>
            <input type="number" onChange={inputNum} value={num} />
            <button onClick={setAllArr}>set</button>
            <Col>
                <h6>X</h6>
                {arrX.map((i, index) => (
                    <input key={index} type="number"  value={arrX[index]} onChange={(e) => { inputArrX(e, index) }} ></input>
                ))}
            </Col>
            <Col>
                <h6>Y</h6>
                {arrY.map((i, indexY) => (
                    <input key={indexY} type="number" value={arrY[indexY]} onChange={(e) => { inputArrY(e, indexY) }} ></input>
                ))}
            </Col>
            <Col>
                <h6>X input</h6>
                <input type="number" onChange={inputI} value={input}></input>
            </Col>
            <br></br>
            <button onClick={calculate}>calculate</button>
            <br></br>
            <h5>ANSWER = {result}</h5>
            <Plot
            data={[
              {
                x: graphX,
                y: graphY,
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'red'},
              },
            ]}
            layout={ {width: 600, height: 400, title: 'Spline test'} }
          />
        </Container>
    )
}

export default test
