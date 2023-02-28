// React utilities
import React from 'react';
import { Link } from 'react-router-dom'
// Components 
//import { addToFav, addToCart } from './favAndCart';
// Styles
//import { BsCartFill, BsStarFill } from 'react-icons/bs';
//import ReactStars from 'react-stars';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Cards.css'


export default function ProductCard({ nombre, marca,precio,imagen }) {

  return (
    <Card className="card" >
      <Link className='containCardImage' to={"/detail/"}>
        <img className='cardImage' src={imagen} alt="" />
      </Link>
      <Card.Body className='containCardBody'>
        <Link to={"/detail/"}>
          <Card.Title className='containerName'>{nombre}</Card.Title>
        </Link>
        <ListGroup className='containerListDescription' variant="flush">
          <ListGroup.Item className='cardBrand'>{marca}</ListGroup.Item>
          <ListGroup.Item className='cardPrice'>${precio}</ListGroup.Item>
         
        </ListGroup>
      </Card.Body>
      {/* <div className='containerButton'>
        <BsStarFill className='CardIcon' onClick={() => addToFav(id, name, price, rating, image, brand, handleAdded, handleNotAdded)} />
        <BsCartFill className='CardIcon' onClick={() => addToCart(id, name, price, rating, image, brand, color, handleAdded, handleNotAdded)} />
      </div> */}
    </Card>
  )
}