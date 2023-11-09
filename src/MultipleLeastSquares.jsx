import React from "react";
import { Form, Button, Row, Col, InputGroup, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useState } from "react";

function MultipleLeastSquares() {
    const [matrix, setMatrix] = useState([[-2,3,1],[3,4,-5], [1,-2,1]]);
    const [b, setB] = useState([9,0,-4])

    const [dataX, setDataX] = useState([10,15,20,30,40,50,60,70,80]);
    const [dataY, setDataY] = useState([5,9,15,18,22,30,35,38,43]);
    const [xInput, setXInput] = useState(0)
    const [mInput, setMInput] = useState(0)
    const [size, setSize] = useState(9);
    const [result, setResult] = useState(0);

    const inputMatrixSize = ()=> {
        const newMatrix = [];
        for (let i = 0; i < size; i++) {
            const rowMatrix = [];
            for (let j = 0; j < size; j++) {
                rowMatrix.push(0);
            }
            newMatrix.push(rowMatrix);
        }
        setMatrix(newMatrix);

        const newB = [];
        for (let i = 0; i < size;i++) {
            newB.push(0);
        }
        setB(newB);
    }
    const changeMatrix = (event, row, col)=> {
        const newMatrix = [...matrix];
        newMatrix[row][col] = event.target.value;
        setMatrix(newMatrix);
    }
    const inputB = (event, index)=> {
        const newB = [...b];
        newB[index] = event.target.value;
        setB(newB);
    }


    const inputSize = (event)=> {
        if (event.target.value >= 2) {
            setSize(event.target.value);
        }
    }

    const inputX = (event)=> {
        setXInput(event.target.value);
    }

    const inputM = (event)=> {
        setMInput(event.target.value);
    }

    const inputArraySize = ()=> {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(0);
        }
        setDataX(array);
        setDataY(array);
    }


    const inputDataX = (event, index)=> {
        const newX = [...dataX];
        newX[index] = event.target.value;
        setDataX(newX);
    }

    const inputDataY = (event, index)=> {
        const newY = [...dataY];
        newY[index] = event.target.value;
        setDataY(newY);
    }

    const gauss=(mtx)=>{
        let temp,fixed;
        for (let i=0;i< mtx.length;i++){
            fixed = mtx[i][i];
            for (let k=0;k<mtx[0].length;k++){
                mtx[i][k] /= fixed;
            }
            for (let j=0;j< mtx.length;j++){
                if (i!=j){
                    temp=mtx[j][i];
                    for (let r=0;r<mtx[0].length;r++){
                        mtx[j][r] -= mtx[i][r]*temp ;
                    }
                }
            }
        }
    }

   const polynomial=( X, Y,input, m)=>{
        let length = X.length;
        let matrix = [];
        let sum=0,output=0;

        for (let i = 0; i < m; i++) {
            let temp = [];
            for (let i = 0; i < m+1; i++) {
                temp.push(0);
            }
            matrix.push(temp);
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0;j < matrix[0].length;j++){
                if (i==j) {
                    for (let k = 0; k < length; k++) {
                        sum += Math.pow(X[k], i * 2);
                    }
                    matrix[i][j] = sum;
                } else if (j == matrix[0].length-1) {
                    for (let k = 0; k < length; k++) {
                        sum += Math.pow(Y[k], 1) * Math.pow(X[k], i);
                    }
                    matrix[i][j] = sum;
                } else {
                    for (let k = 0; k < length; k++) {
                        sum += Math.pow(X[k], (i+j));
                    }
                    matrix[i][j] = sum;
                }
                sum=0;
            }
        }
        gauss(matrix);
        for (let i = 0;i<matrix.length;i++){
            output += matrix[i][matrix[0].length-1] * Math.pow(input,i);
        }
        return output;
    }

    const multiple=( X, Y) => {
        let order = X.length + 1;
        let length = X[0].length;
        let output = [];
        let matrix = [];

        for (let i = 0; i < order; i++) {
            let temp = [];
            for (let i = 0; i < order+1; i++) {
                temp.push(0);
            }
            matrix.push(temp);
        }

        matrix[0][0] = length;

        for (let i = 1; i < order; i++) {
            let sumX = 0;
            for (let j = 0; j < length; j++) {
                sumX += X[i - 1][j];
            }
            matrix[0][i] = sumX;
        }
        for (let i = 1; i < order; i++) {
            for (let j = 0; j < order; j++) {
                let sumX = 0;
                for (let k = 0; k < length; k++) {
                    if (j == 0) {
                        sumX += X[i-1][k];
                    } else {
                        sumX += X[j - 1][k] * X[i - 1][k];
                    }
                }
                matrix[i][j] = sumX;
            }
        }
        for (let i = 0; i < order; i++) {
            let sumXY = 0;
            for (let j = 0; j < length; j++) {
                if (i == 0) {
                    sumXY += Y[j];
                } else {
                    sumXY += Y[j] * X[i - 1][j];
                }
            }
            matrix[i][order] = sumXY;
        }
        gauss(matrix);
        for (let i = 0;i<matrix.length;i++){
            output.push(matrix[i][order]);
        }
    }
    // public static void main(String[] args) {
    //     double[][] x = {{1,0,2,3,4,2,1},{0,1,4,2,1,3,6},{1,3,1,2,5,3,4}};
    //     double[] fx = {4,-5,-6,0,-1,-7,-20};
    //     multiple(x,fx);
    // }

    const calculator = ()=> {
        let output;
        let input = xInput,m = mInput;
        let X = [...dataX];
        let Y = [...dataY];

        output = polynomial(X,Y,input,m);

        setResult(output);
    }

    return(
        <Container>
                <form>
                    <h1>Least-Squares Regression</h1>
                    <h2>- Multiple</h2>
                    <InputGroup>
                        <Col xs={2}>
                            <Form.Label className="text-center" >Size of Array</Form.Label>
                        </Col>
                        <Row>
                            <Form.Control type="number" value={size} onChange={(e)=> {inputSize(e)}}></Form.Control>
                        </Row>
                        <Row>
                            <Button variant="dark" onClick={inputArraySize}>set</Button>
                        </Row>
                    </InputGroup>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th></th>
                            {Array.from({ length: dataX.length }).map((_, index) => (
                            <th key={index}>{index}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>X</td>
                            {dataX.map((_, index)=> (
                                    <td key={index}>
                                        <Form.Control value={dataX[index]} onChange={(e)=> inputDataX(e, index)}></Form.Control>
                                    </td>
                            ))}
                        </tr>
                        <tr>
                            <td>Y</td>
                            {dataY.map((_, index)=> (
                                    <td key={index}>
                                        <Form.Control value={dataY[index]} onChange={(e)=> inputDataY(e, index)}></Form.Control>
                                    </td>
                            ))}
                        </tr>
                        </tbody>
                    </Table>


                    <Table responsive>
                        <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>X input</td>
                            <td>
                                <Form.Control value={xInput} onChange={(e)=> inputX(e)}></Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>M</td>
                            <td>
                                <Form.Control value={mInput} onChange={(e)=> inputM(e)}></Form.Control>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <Container className="text-center">
                            <Button variant="primary" onClick={calculator} >Calculate</Button>
                    </Container>
                    
                </form>
                <Container className="text-center">
                    <h3>Answer = {parseFloat(result)}</h3>
                </Container>
            
        </Container>
        
    )
}

export default MultipleLeastSquares;