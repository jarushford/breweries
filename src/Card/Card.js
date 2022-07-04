// GENERAL IMPORTS

import React, { useContext } from 'react';

// STYLES

import './Card.scss';


const Card = ({ brewery }) => {
  return (
    <article className="card">
      <h2><a href={brewery.website_url} target="_blank">{brewery.name}</a></h2>
      <h3>{brewery.city}</h3>
    </article>
  )
}

export default Card;