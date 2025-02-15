import { PokedexAPI } from "@/apis/pokedex";
import { useQuery } from "@tanstack/react-query";

export const usePokeTypes = () => {
  return useQuery({
    queryKey: ["poke-types"],
    queryFn: async () => {
      return PokedexAPI.getTypesList();
    },
  });
};
