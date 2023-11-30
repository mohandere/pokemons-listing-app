import React, { useEffect, useState } from "react";
import { getPokemons, getPokemonDetails } from "../../services/pokemon";
import { List } from "../../../lib/ui/index";

export default function Home() {
  const [pokemans, setPokemans] = useState([]);
  const [detailsResponse, setDetailsResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPokemons() {
      setIsLoading(true);
      try {
        const response = await getPokemons();
        setPokemans(response.results);
      } catch (e) {
        setDetailsResponse([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  useEffect(() => {
    async function fetchPokemonsDetails() {
      setIsLoading(true);
      const listOfPromises = pokemans.map(({ url }) => getPokemonDetails(url));
      try {
        const detailsResponse = (await Promise.allSettled(listOfPromises)).map(
          (resp) => resp.value
        );
        const result = detailsResponse.reduce((acc, item) => {
          acc[item.name] = item.abilities;
          return acc;
        }, {});
        setDetailsResponse(result);
      } catch (e) {
        setDetailsResponse([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPokemonsDetails();
  }, [pokemans]);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const mergeLists = (pokemans, pokemansDetails) => {
    return pokemans.map((pokeman) => {
      return {
        ...pokeman,
        abilities: pokemansDetails[pokeman.name].map((item) => item.ability),
      };
    });
  };

  //   console.log("pokemons-->", pokemans);
  //   console.log("pokemansDetails-->", detailsResponse);
  const pokemansWithAbilities = mergeLists(pokemans, detailsResponse);

  return (
    <div>
      <List items={pokemansWithAbilities} />
    </div>
  );
}
