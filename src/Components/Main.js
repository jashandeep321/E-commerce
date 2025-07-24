// import logo1 from '../img/logo1.png';
// import bg1 from '../img/bg1.jpg';
// import Menu from './Menu';
// import Car from './Carousel';

import Grid from './grid';
import Banner from './Banner';
import Terms from './terms';
import NewCollections from './NewCollections';
import React,{useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import ProductDisplay from './ProductDisplay/ProductDisplay';
// import Reservation from './Reservation';
// import Footer from './Footer';
// import Home from './Home';

function Main() {
  const[name ,setName]=useState('')
  const navigate= useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:8082/')
    .then(res=>{
      if(res.data.valid){
        setName(res.data.uname)
      }else{
        navigate('/login')
      }
      console.log(res)
    })
    .catch(err=> console.log(err))
  },[])

  return (
    <div>
        <Banner/>
        <Terms/>
        <Grid/>
        <NewCollections/>
        {/* <Reservation/>
        <Footer/> */}
    </div>
  );}
export default Main;