import React from 'react';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 1rem;
  }
  .empty-star {
    filter: grayscale(100%);
  }
`;

function BeerRating({ rating }) {
  const rounded = Math.round(rating.average);
  return (
    <p title={`${rounded} out of 5 stars`}>
      {`⭐`.repeat(rounded)}
      <span className="empty-star">{`⭐`.repeat(5 - rounded)}</span>
      <span>({rating.reviews})</span>
    </p>
  );
}

function SingleBeer({ beer }) {
  return (
    <SingleBeerStyles>
      <img src={beer.image} alt={beer.name} />
      <h3>{beer.name}</h3>
      <span className="price">{beer.price}</span>
      <BeerRating rating={beer.rating} />
    </SingleBeerStyles>
  );
}

export default function BeerList({ beers }) {
  return (
    <BeerGridStyles>
      {beers.map((beer) => (
        <SingleBeer beer={beer} key={beer.id} />
      ))}
    </BeerGridStyles>
  );
}
