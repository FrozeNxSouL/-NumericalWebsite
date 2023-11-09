import NumericalNavbar from "./Navbar";
import "./App.css";
import Bisection from "./Bisection";
import Graphical from "./Graphical";
import FalsePosition from "./FalsePosition";
import OnePoint from "./OnePoint";
import { Route, Routes,BrowserRouter } from "react-router-dom";
import NewtonRaphson from "./NewtonRaphson";
import Secantmethod from "./Secant";
import Cramer from "./Cramer";
import Gaussian from "./gaussian";
import GaussJordan from "./gaussjordan";
import MatrixInversion from "./matrixInverse";
import LU from "./LU";
import Jacobi from "./Jacobi";
import GaussSeidel from "./GaussSeidel";
import ConjugateGradient from "./ConjugateGradient";
import NewtonDivided from "./NewtonDivided";
import Lagrange from "./Lagrange";
import LinearLeastSquares from "./LinearLeastSquares";
import PolynomialLeastSquares from "./PolynomialLeastSquares";
import TrapezoidalRule from "./TrapezoidalRule";
import CompositeTrapezoidalRule from "./CompositeTrapezoidalRule";
import SimpsonsRule from "./SimpsonsRule";
import CompositeSimpsonsRule from "./CompositeSimpsonsRule";
import Spline from "./Spline";
import Test from "./test";

function App() {
    
    return (
        <div className='main'>
            {/* <header className="nav"> */}
              <NumericalNavbar />
            {/* </header> */}
            <body>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Graphical />}/>
                        <Route path="/Graphical" element={<Graphical />}/>
                        <Route path="/Bisection" element={<Bisection />}/>
                        <Route path="/FalsePosition" element={<FalsePosition />}/>
                        <Route path="/OnePoint" element={<OnePoint />}/>
                        <Route path="/NewtonRaphson" element={<NewtonRaphson />}/>
                        <Route path="/Secant" element={<Secantmethod />}/>
                        <Route path="/Cramer" element={<Cramer />}/>
                        <Route path="/Gaussian" element={<Gaussian />}/>
                        <Route path="/GaussJordan" element={<GaussJordan />}/>
                        <Route path="/MatrixInversion" element={<MatrixInversion />}/>
                        <Route path="/LU" element={<LU />}/>
                        <Route path="/Jacobi" element={<Jacobi />}/>
                        <Route path="/GaussSeidel" element={<GaussSeidel />}/>
                        <Route path="/ConjugateGradient" element={<ConjugateGradient />}/>
                        <Route path="/NewtonDivided" element={<NewtonDivided />}/>
                        <Route path="/Lagrange" element={<Lagrange />}/>
                        <Route path="/LinearLeastSquares" element={<LinearLeastSquares />}/>
                        <Route path="/Spline" element={<Spline />}/>
                        <Route path="/PolynomialLeastSquares" element={<PolynomialLeastSquares />}/>
                        <Route path="/TrapezoidalRule" element={<TrapezoidalRule />}/>
                        <Route path="/CompositeTrapezoidalRule" element={<CompositeTrapezoidalRule />}/>
                        <Route path="/SimpsonsRule" element={<SimpsonsRule />}/>
                        <Route path="/CompositeSimpsonsRule" element={<CompositeSimpsonsRule />}/>
                        <Route path="/test" element={<Test />}/>
                    </Routes>
                </BrowserRouter>
            </body>
        </div>
    );
}

export default App;