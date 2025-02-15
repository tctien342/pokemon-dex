import { PokedexAPI } from "@/apis/pokedex";
import { useQuery } from "@tanstack/react-query";

export const usePokeDetail = (name: string) => {
  return useQuery({
    queryKey: ["poke-detail", name],
    queryFn: async () => {
      return PokedexAPI.getPokemonByName(name);
    },
  });
};
