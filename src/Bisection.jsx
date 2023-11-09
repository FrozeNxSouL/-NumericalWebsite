// import { useState } from "react";
// import { Button, Container, Form, Table } from "react-bootstrap";
// import { evaluate } from 'mathjs'
// import axios from "axios";


// function Bisection() {
//     const print = () => {
//         console.log(data)
//         setValueIter(data.map((x) => x.iteration));
//         setValueXl(data.map((x) => x.Xl));
//         setValueXm(data.map((x) => x.Xm));
//         setValueXr(data.map((x) => x.Xr));
//         return (
//             <Container>
//                 <Table striped bordered hover variant="dark">
//                     <thead>
//                         <tr>
//                             <th width="10%">Iteration</th>
//                             <th width="30%">XL</th>
//                             <th width="30%">XM</th>
//                             <th width="30%">XR</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((element, index) => {
//                             return (
//                                 <tr key={index}>
//                                     <td>{element.iteration}</td>
//                                     <td>{element.Xl}</td>
//                                     <td>{element.Xm}</td>
//                                     <td>{element.Xr}</td>
//                                 </tr>)
//                         })}
//                     </tbody>
//                 </Table>
//             </Container>

//         );
//     }

//     const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

//     const Calbisection = (xl, xr) => {
//         var xm, fXm, fXr, ea, scope;
//         var iter = 0;
//         var MAX = 50;
//         const e = 0.00001;
//         var obj = {};
//         do {
//             xm = (xl + xr) / 2.0;
//             scope = {
//                 x: xr,
//             }
//             fXr = evaluate(Equation, scope)

//             scope = {
//                 x: xm,
//             }
//             fXm = evaluate(Equation, scope)

//             iter++;
//             obj = {
//                 iteration: iter,
//                 Xl: xl,
//                 Xm: xm,
//                 Xr: xr
//             }
//             data.push(obj)
//             if (fXm * fXr > 0) {
//                 ea = error(xr, xm);
//                 xr = xm;
//             }
//             else if (fXm * fXr < 0) {
//                 ea = error(xl, xm);
//                 xl = xm;
//             }
//         } while (ea > e && iter < MAX)
//         setX(xm)
//     }

//     const data = [];
//     const [valueIter, setValueIter] = useState([]);
//     const [valueXl, setValueXl] = useState([]);
//     const [valueXm, setValueXm] = useState([]);
//     const [valueXr, setValueXr] = useState([]);


//     const [html, setHtml] = useState(null);
//     const [Equation, setEquation] = useState("(x^4)-13")
//     const [X, setX] = useState(0)
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
//         const xlnum = parseFloat(XL)
//         const xrnum = parseFloat(XR)
//         Calbisection(xlnum, xrnum);

//         setHtml(print());

//         console.log(valueIter)
//         console.log(valueXl)
//     }

//     return (
//         <Container>
//             <h1>Bisection</h1>
//             <Form >
//                 <Form.Group className="mb-3">
//                     <Form.Label>Input f(x)</Form.Label>
//                     <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
//                     <Form.Label>Input XL</Form.Label>
//                     <input type="number" id="XL" onChange={inputXL} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
//                     <Form.Label>Input XR</Form.Label>
//                     <input type="number" id="XR" onChange={inputXR} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
//                 </Form.Group>
//                 <Button variant="dark" onClick={calculateRoot}>
//                     Calculate
//                 </Button>
//                 <Button onClick={() => {
//                     axios.get("http://localhost:8080/bisection").then(e => {
//                         setEquation(e.data[0].equation);
//                     })
//                 }}>get F(x)</Button>
//             </Form>
//             <br></br>
//             <h5>Answer = {X.toPrecision(7)}</h5>
//             <Container>
//                 {html}
//             </Container>

//         </Container>
//     );
// }

// export default Bisection;

import React, { Component } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';
import axios from "axios";

class Bisection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Equation: "(x^4)-13",
            X: 0,
            XL: 0,
            XR: 0,
            valueIter: [],
            valueXl: [],
            valueXm: [],
            valueXr: [],
            data: [],
            html: null,
        };
    }

    error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    Calbisection = (xl, xr) => {
        var xm, fXm, fXr, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};
        do {
            xm = (xl + xr) / 2.0;
            scope = {
                x: xr,
            };
            fXr = evaluate(this.state.Equation, scope);

            scope = {
                x: xm,
            };
            fXm = evaluate(this.state.Equation, scope);

            iter++;
            obj = {
                iteration: iter,
                Xl: xl,
                Xm: xm,
                Xr: xr
            };
            this.state.data.push(obj);
            if (fXm * fXr > 0) {
                ea = this.error(xr, xm);
                xr = xm;
            } else if (fXm * fXr < 0) {
                ea = this.error(xl, xm);
                xl = xm;
            }
        } while (ea > e && iter < MAX);
        this.setState({ X: xm });
    }

    print = () => {
        const data = this.state.data;
        this.setState({
            valueIter: data.map((x) => x.iteration),
            valueXl: data.map((x) => x.Xl),
            valueXm: data.map((x) => x.Xm),
            valueXr: data.map((x) => x.Xr)
        });
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.Xl}</td>
                                    <td>{element.Xm}</td>
                                    <td>{element.Xr}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        );
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
        const xlnum = parseFloat(this.state.XL);
        const xrnum = parseFloat(this.state.XR);
        this.Calbisection(xlnum, xrnum);

        const html = this.print();
        this.setState({ html });
    }

    render() {
        return (
            <Container>
                <h1>Bisection</h1>
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
                        <Form.Label>Input XL</Form.Label>
                        <input
                            type="number"
                            id="XL"
                            onChange={this.inputXL}
                            style={{ width: "20%", margin: "0 auto" }}
                            className="form-control"
                        ></input>
                        <Form.Label>Input XR</Form.Label>
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
                            axios.get("http://localhost:8080/bisection").then((e) => {
                                this.setState({ Equation: e.data[0].equation });
                            });
                        }}
                    >
                        get F(x)
                    </Button>
                </Form>
                <br></br>
                <h5>Answer = {this.state.X.toPrecision(7)}</h5>
                <Container>
                    {this.state.html}
                </Container>
            </Container>
        );
    }
}

export default Bisection;
