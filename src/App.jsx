import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { Input } from "@/components/ui/input";
const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const listResponse = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const listData = await listResponse.json();
        const urls = listData.results.map((pokemon) => pokemon.url);
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((res) => res.json()));
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  if (loading) return <h1>Loading..</h1>;
  return (
    <>
      <div className="p-4 w-fit">
        <Input
          type="text"
          placeholder="Search Pokemons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 p-4 gap-4">
        {filteredPokemon.map((data, id) => {
          return (
            <PokemonCard
              key={id}
              ability={data.abilities[0].ability.name}
              img={data.sprites.front_default}
              species={data.species.name}
              pokemoname={data.name}
            />
          );
        })}
      </div>
    </>
  );
};

export default PokemonList;
