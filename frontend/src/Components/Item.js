import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item card' style={{ width: '',}}>
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={props.image} alt="" className="card-img-top" style={{ width: '100%' }} />
      </Link>
      <div className="card-body">
        <p className="card-text" style={{ margin: '6px 0px' }}>{props.name}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="item-prices" style={{display: 'flex'}}>
            <div className="items-price-new me-2" style={{ color: '#374151', fontSize: '18px', fontWeight: '600' }}>${props.new_price}</div>
            <div className="item-price-old" style={{ color: '#8c8c8c', fontSize: '18px', fontWeight: '500', textDecoration: 'line-through' }}>${props.old_price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
