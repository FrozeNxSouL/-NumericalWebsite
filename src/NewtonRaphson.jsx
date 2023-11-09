import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { derivative, evaluate } from 'mathjs'
import axios from "axios";

function NewtonRaphson() {
    const print = () => {
        console.log(data)
        setValueIter(data.map((x) => x.iteration));
        setValueXold(data.map((x) => x.Xold));
        setValueXnew(data.map((x) => x.Xnew));
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="20%">Iteration</th>
                            <th width="40%">X old</th>
                            <th width="40%">X new</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.Xold}</td>
                                    <td>{element.Xnew}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>

        );
    }
    const fxCal = (input) => input - (evaluate(Equation, { x: input }) / (derivative(Equation, 'x').evaluate({ x: input })));

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalNewtonRaphson = (xnew) => {
        var xold, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};
        do {
            xold = xnew;
            xnew = fxCal(xold);

            iter++;

            ea = error(xold, xnew);
            obj = {
                iteration: iter,
                Xold: xold,
                Xnew: xnew,
            }
            data.push(obj)

        } while (ea > e && iter < MAX)
        setX(xnew)
    }

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueXold, setValueXold] = useState([]);
    const [valueXnew, setValueXnew] = useState([]);


    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("x^2 - 7")
    const [X, setX] = useState(0)
    const [Xinput, setXinput] = useState(0)

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX = (event) => {
        console.log(event.target.value)
        setXinput(event.target.value)
    }


    const calculateRoot = () => {
        const xinput = parseFloat(Xinput)
        CalNewtonRaphson(xinput);

        setHtml(print());

    }

    return (
        <Container>
            <h1>Newton Raphson</h1>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input X start</Form.Label>
                    <input type="number" id="Xinput" onChange={inputX} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <Button onClick={() => {
                    axios.get("http://localhost:8080/newtonraphson").then(e => {
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

export default NewtonRaphson;