import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;

    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // Check if this is an existing topping
      const existingTopping = acc[topping.name];
      if (existingTopping) {
        // If it is, increment by 1
        existingTopping.count += 1;
      }
      // Otherwise create a new entry in our acc and set it to one
      else {
        acc[topping.name] = {
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  // Return the pizzas with counts
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // Get a list of all the toppings
  // Get a list of all the Pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          id
          toppings {
            name
            id
            vegetarian
          }
        }
      }
    }
  `);
  // Count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // Loop over the list of toppings and display the topping and the count of pizzas in that topping

  // Link it up ...
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.name}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
