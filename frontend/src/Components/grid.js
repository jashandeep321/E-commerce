import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from "react";
import Button from 'react-bootstrap/Button';
import sec1 from '../Images/men.jpg';
import sec2 from '../Images/kid.jpg';
import sec3 from '../Images/heels2.jpg';
import sec4 from '../Images/women8.jpg';

const textStyle = {
  color: 'white',    
  textAlign: 'left', 
};

export default function Grid() {
  return (
    <section className="grid m-5 mr-auto ml-auto" id="grid">
      <div className="row justify-content-center">
        <div className="set1 col-6 pb-3" style={{ width: '450px' }}>
          <div style={{ position: 'relative' }}>
            <img src={sec1} className="img-fluid" alt="..." />
            <div className="card-img-overlay col-3 m-4 mt-3" style={textStyle}>
              <h4 className="fw-bold fw-dark">Dress to impress </h4>
              <h1 className="fw-bold display-4">MEN'S FASHION</h1>
              <Link to="/Men"><Button variant="outline-light fw-bold">Shop Now</Button></Link>
              {/* <h4 className="fw-bold">Fashion</h4> */}
            </div>
          </div>
        </div>
        <div className="col-6" style={{ width: '450px' }}>
          <div className="set2 pb-4">
            <div style={{ position: 'relative' }}>
              <img src={sec2} className="img-fluid" alt="..." />
              <div className="card-img-overlay col-6 m-3 mt-2" style={textStyle}>
                <h4 className="fw-bold">For proactive kid's</h4>
                <h1 className="fw-bold display-6">COMFY FASHION</h1>
                <Link to="/Kids"><Button variant="outline-light fw-bold">Shop Now</Button></Link>
              </div>
            </div>
          </div>
          <div className="set2 pb-4">
            <div style={{ position: 'relative' }}>
              <img src={sec3} className="img-fluid" alt="..." />
              <div className="card-img-overlay col-8 m-3" style={textStyle}>
                <h4 className="fw-bold">Elegance in every step </h4>
                <h1 className="fw-bold display-6">CLASSY FASHION</h1>
                <Button variant="outline-light fw-bold">Shop Now</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="set1 col-6 pb-3" style={{ width: '450px'  }}>
          <div style={{ position: 'relative' }}>
            <img src={sec4} className="img-fluid" alt="..." />
            <div className="card-img-overlay col-4 m-4 mt-3" style={textStyle}>
              <h4 className="fw-bold">From old to recently</h4>
              <h1 className="fw-bold display-4">TRENDY FASHION</h1>
              {/* <Button variant="outline-dark fw-bold">Shop Now</Button> */}
              <Link to="/Women"><Button variant="outline-light fw-bold">Shop Now</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
