import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Link } from 'gatsby';

const SlicemasterGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
    h2 {
      transform: (rotate(-2deg));
      text-align: center;
      font-size: 4rem;
      margin-bottom: -2rem;
      position: relative;
      z-index: 2;
    }
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: -6rem 2rem 2rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

function Slicemaster({ slicemaster }) {
  return (
    <SlicemasterStyles>
      <Link to={`/slicemaster/${slicemaster.slug.current}`}>
        <h2>
          <span className="mark">{slicemaster.name}</span>
        </h2>
      </Link>
      <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
      <p className="description">{slicemaster.description}</p>
    </SlicemasterStyles>
  );
}

export default function SlicemasterList({ slicemasters }) {
  return (
    <SlicemasterGrid>
      {slicemasters.map((slicemaster) => (
        <Slicemaster slicemaster={slicemaster} key={slicemaster.id} />
      ))}
    </SlicemasterGrid>
  );
}
