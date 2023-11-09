import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { derivative, evaluate } from 'mathjs'
import axios from "axios";

function Secantmethod() {
    const print = () => {
        console.log(data)
        setValueIter(data.map((x) => x.iteration));
        setValueX0(data.map((x) => x.X0));
        setValueX1(data.map((x) => x.X1));
        setValueX2(data.map((x) => x.X2));
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X0</th>
                            <th width="30%">X1</th>
                            <th width="30%">X2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.X0}</td>
                                    <td>{element.X1}</td>
                                    <td>{element.X2}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>

        );
    }
    const fxCal = (input, input2) => input - (evaluate(Equation, { x: input }) * (input - input2)) / (evaluate(Equation, { x: input }) - evaluate(Equation, { x: input2 }));

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalSecantmethod = (x1, x2) => {
        var x0, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};
        do {
            x0 = x1;
            x1 = x2;
            x2 = fxCal(x0, x1);

            iter++;

            ea = error(x1, x2);
            obj = {
                iteration: iter,
                X0: x0,
                X1: x1,
                X2: x2,
            }
            data.push(obj)

        } while (ea > e && iter < MAX)
        setX(x2)
    }

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valueX2, setValueX2] = useState([]);


    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("x^2 - 7")
    const [X, setX] = useState(0)
    const [Xinput, setXinput] = useState(0)
    const [Xinput2, setXinput2] = useState(0)

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX = (event) => {
        console.log(event.target.value)
        setXinput(event.target.value)
        setXinput2(event.target.value)
    }
    const inputX2 = (event) => {
        console.log(event.target.value)
        setXinput2(event.target.value)
    }


    const calculateRoot = () => {
        const xinput = parseFloat(Xinput)
        const xinput2 = parseFloat(Xinput2)
        CalSecantmethod(xinput, xinput2);

        setHtml(print());

        console.log(valueIter)
        console.log(valueXl)
    }

    return (
        <Container>
            <h1>Secant Method</h1>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input X0</Form.Label>
                    <input type="number" id="Xinput" onChange={inputX} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input X1</Form.Label>
                    <input type="number" id="Xinput" onChange={inputX2} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <Button onClick={() => {
                    axios.get("http://localhost:8080/secant").then(e => {
                        setEquation(e.data[0].equation);
                    })
                }}>get F(x)</Button>
            </Form>
            <br></br>
            <h5>X = {X.toPrecision(7)}</h5>
            <Container>
                {html}
            </Container>

        </Container>
    );
}

export default Secantmethod;