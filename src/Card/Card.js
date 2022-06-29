import React, { useContext } from 'react';
import AppContext from '../AppContext';
import './Card.scss';

const Card = ({ brewery }) => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <article className="card">
      <h2><a href={brewery.website_url} target="_blank">{brewery.name}</a></h2>
      <h3>{brewery.city}</h3>
    </article>
  )
}

export default Card;