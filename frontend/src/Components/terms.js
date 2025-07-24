// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import delivery from '../Images/delivery.png';
// import card from '../Images/card.png';
// import exchange from '../Images/exchange.png';
// // import Col from 'react-bootstrap/Col';

// const textStyle = {
//     // color: 'white',    
//     textAlign: 'left', 
//     border: '1px solid #A9A9A9',
//     margin:'2px',
//     display:'flex',
//   };

// function Terms() {
//   return (
//     <Container className="justify-content-center">
//       {/* <Row> */}
//         <section className="grid m-5 mr-auto ml-auto" id="grid">
//       <div className="row justify-content-center">
//         <div className="set1 col-4 ">
//           <div style={{ position: 'relative' }}>
          
//             <div className=" col-10 m-auto p-2" style={textStyle}>
//             <img src={delivery} className="img-fluid m-auto" alt="..." />
//             <div className='m-auto'>
//               <h5 className="fw-bold fw-dark">Free Shipping </h5>
//               <p className="m-0">Capped at Rs300 per order </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="set1 col-4 ">
//           <div style={{ position: 'relative' }}>
//             <div className=" col-10 m-auto p-2" style={textStyle}>
//             <img src={card} className="img-fluid m-auto" alt="..." />
//             <div className='m-auto'>
//             <h5 className="fw-bold fw-dark">Security Payments</h5>
//               <p className="m-0">Up to 12 months installments </p>
//             </div>
//             </div>
//           </div>
//         </div>
//         <div className="set1 col-4 ">
//           <div style={{ position: 'relative' }}>
//             <div className=" col-10 m-auto p-2" style={textStyle}>
//             <img src={exchange} className="img-fluid m-auto" alt="..." />
//             <div className='m-auto'>
//             <h5 className="fw-bold fw-dark">15-Day Returns  </h5>
//               <p className="m-0">Shop with confidence</p>
//             </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//       {/* </Row> */}
//     </Container>
//   );
// }

// export default Terms;



import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import delivery from '../Images/delivery.png';
import card from '../Images/card.png';
import exchange from '../Images/exchange.png';

const textStyle = {
  textAlign: 'left',
  border: '1px solid #A9A9A9',
  margin: '2px',
  display: 'flex',
};

function Terms() {
  return (
    <Container className='mt-5'>
      <Row className="justify-content-center">
        <Col sm={12} md={4}>
          <div style={{ position: 'relative' }}>
            <div className="p-2" style={textStyle}>
              <img src={delivery} className="img-fluid m-auto" alt="Free Shipping" />
              <div className='m-auto'>
                <h5 className="fw-bold fw-dark">Free Shipping</h5>
                <p className="m-0">Capped at Rs300 per order</p>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div style={{ position: 'relative' }}>
            <div className="p-2" style={textStyle}>
              <img src={card} className="img-fluid m-auto" alt="Security Payments" />
              <div className='m-auto'>
                <h5 className="fw-bold fw-dark">Security Payments</h5>
                <p className="m-0">Up to 12 months installments</p>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div style={{ position: 'relative' }}>
            <div className="p-2" style={textStyle}>
              <img src={exchange} className="img-fluid m-auto" alt="15-Day Returns" />
              <div className='m-auto'>
                <h5 className="fw-bold fw-dark">15-Day Returns</h5>
                <p className="m-0">Shop with confidence</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Terms;
