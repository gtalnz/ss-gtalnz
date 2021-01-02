import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function SingleToppingPage({ data: { topping, pizzas } }) {
  return (
    <div>
      <ToppingsFilter activeTopping={topping} />
      <PizzaList pizzas={pizzas.nodes} />
    </div>
  );
}

export const query = graphql`
  query($name: String!) {
    topping: sanityTopping(name: { eq: $name }) {
      name
      id
      vegetarian
    }
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $name } } } }
    ) {
      nodes {
        name
        id
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
        }
        toppings {
          name
          id
          vegetarian
        }
      }
    }
  }
`;
