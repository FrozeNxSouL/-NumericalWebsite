// import { useState } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import { evaluate } from 'mathjs'
// import axios from "axios";

// function Graphical() {

//     const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

//     const CalGraphical = (x, end) => {
//         var y1, y2, y3, y4, scope;
//         var x1 = x, x2 = 0, step = 1;
//         const e = 0.000001;
//         scope = {
//             x: x1,
//         }
//         y1 = evaluate(Equation, scope);
//         while (y1 != 0 && x1 <= end) {
//             x1 += step;
//             scope = {
//                 x: x1,
//             }
//             y2 = evaluate(Equation, scope);
//             if (y1 * y2 < 0) {
//                 x1 -= step;
//                 step /= 10;
//             }
//             else {
//                 y1 = y2;
//             }
//         }
//         setX(x1);
//         console.log(x1);
//     }


//     const [Equation, setEquation] = useState("(43*x)-180")
//     const [X, setX] = useState(0)
//     const [X2, setX2] = useState(0)
//     const [XL, setXL] = useState(0)
//     const [XR, setXR] = useState(0)

//     const inputEquation = (event) => {
//         console.log(event.target.value)
//         setEquation(event.target.value)
//     }

//     const inputXL = (event) => {
//         console.log(event.target.value)
//         setXL(event.target.value)
//     }

//     const inputXR = (event) => {
//         console.log(event.target.value)
//         setXR(event.target.value)
//     }

//     const calculateRoot = () => {
//         const StartX = parseFloat(XL)
//         const LimitX = parseFloat(XR)
//         CalGraphical(StartX, LimitX);

//     }

//     return (
//         <Container>
//             <h1>Graphical</h1>
//             <Form >
//                 <Form.Group className="mb-3">
//                     <Form.Label>Input f(x)</Form.Label>
//                     <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
//                     <Form.Label>X start</Form.Label>
//                     <input type="number" id="XL" onChange={inputXL} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
//                     <Form.Label>Limit of X</Form.Label>
//                     <input type="number" id="XR" onChange={inputXR} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
//                 </Form.Group>
//                 <Button variant="dark" onClick={calculateRoot}>
//                     Calculate
//                 </Button>
//                 <Button onClick={() => {
//                     axios.get("http://localhost:8080/graphical").then(e => {
//                         setEquation(e.data[0].equation);
//                     })
//                 }}>get F(x)</Button>
//             </Form>
//             <br></br>
//             <h5>X = {X.toPrecision(7)}</h5>

//         </Container>
//     );
// }

// export default Graphical;

import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from 'mathjs';
import axios from "axios";

class Graphical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Equation: "(43*x)-180",
            X: 0,
            XL: 0,
            XR: 0,
        };
    }

    error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    CalGraphical = (x, end) => {
        var y1, y2, scope;
        var x1 = x, step = 1;
        const e = 0.000001;
        scope = {
            x: x1,
        };
        y1 = evaluate(this.state.Equation, scope);
        while (y1 !== 0 && x1 <= end) {
            x1 += step;
            scope = {
                x: x1,
            };
            y2 = evaluate(this.state.Equation, scope);
            if (y1 * y2 < 0) {
                x1 -= step;
                step /= 10;
            }
            else {
                y1 = y2;
            }
        }
        this.setState({ X: x1 });
        console.log(x1);
    }

    inputEquation = (event) => {
        this.setState({ Equation: event.target.value });
    }

    inputXL = (event) => {
        this.setState({ XL: event.target.value });
    }

    inputXR = (event) => {
        this.setState({ XR: event.target.value });
    }

    calculateRoot = () => {
        const StartX = parseFloat(this.state.XL);
        const LimitX = parseFloat(this.state.XR);
        this.CalGraphical(StartX, LimitX);
    }

    render() {
        return (
            <Container>
                <h1>Graphical</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Input f(x)</Form.Label>
                        <input
                            type="text"
                            id="equation"
                            value={this.state.Equation}
                            onChange={this.inputEquation}
                            style={{ width: "20%", margin: "0 auto" }}
                            className="form-control"
                        ></input>
                        <Form.Label>X start</Form.Label>
                        <input
                            type="number"
                            id="XL"
                            onChange={this.inputXL}
                            style={{ width: "20%", margin: "0 auto" }}
                            className="form-control"
                        ></input>
                        <Form.Label>Limit of X</Form.Label>
                        <input
                            type="number"
                            id="XR"
                            onChange={this.inputXR}
                            style={{ width: "20%", margin: "0 auto" }}
                            className="form-control"
                        ></input>
                    </Form.Group>
                    <Button variant="dark" onClick={this.calculateRoot}>
                        Calculate
                    </Button>
                    <Button
                        onClick={() => {
                            axios.get("http://localhost:8080/graphical").then((e) => {
                                this.setState({ Equation: e.data[0].equation });
                            });
                        }}
                    >
                        get F(x)
                    </Button>
                </Form>
                <br></br>
                <h5>X = {this.state.X.toPrecision(7)}</h5>
            </Container>
        );
    }
}

export default Graphical;
