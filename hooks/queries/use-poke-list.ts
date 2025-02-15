import { PokedexAPI } from "@/apis/pokedex";
import { useQuery } from "@tanstack/react-query";

export const usePokeListByType = (types: string[]) => {
  return useQuery({
    queryKey: ["poke-by-type", types],
    queryFn: async () => {
      const data = await PokedexAPI.getTypeByName(types);
      const typeResultFlat = data
        .flatMap((poke) => poke.pokemon)
        .map((poke) => ({
          name: poke.pokemon.name,
          url: poke.pokemon.url,
        }));

      // Remove duplication if pokemon have multiple types
      const preventDuplication = new Set<string>();
      typeResultFlat.forEach((poke) => preventDuplication.add(poke.name));

      return {
        count: typeResultFlat.length,
        results: Array.from(preventDuplication).map((poke) => ({
          name: poke,
        })),
      };
    },
    staleTime: 1000 * 60 * 5,
    enabled: types.length > 0,
  });
};

export const usePokeListDefault = (
  limit?: number,
  offset?: number,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ["poke-list-default", limit, offset],
    queryFn: async () => {
      const data = await PokedexAPI.getPokemonsList({
        limit,
        offset,
      });
      return {
        ...data,
        results: data.results.map((poke) => ({
          name: poke.name,
          url: poke.url,
        })),
      };
    },
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};

export const usePokeList = (queryConf?: {
  limit?: number;
  offset?: number;
  types?: string[];
}) => {
  const { limit = 24, offset = 0, types = [] } = queryConf || {};

  const {
    data: dataByTypes,
    isLoading: byTypesLoading,
    isError: byTypesError,
  } = usePokeListByType(types);
  const {
    data: dataDefault,
    isLoading: defaultLoading,
    isError: defaultError,
  } = usePokeListDefault(limit, offset, types.length === 0);

  if (types.length > 0) {
    return {
      data: !dataByTypes
        ? null
        : {
            count: dataByTypes.count || 0,
            previous: offset > 0,
            next: dataByTypes.count > offset + limit,
            results: dataByTypes.results.slice(offset, offset + limit),
          },
      isError: byTypesError,
      isLoading: byTypesLoading,
    };
  } else {
    return {
      data: dataDefault,
      isError: defaultError,
      isLoading: defaultLoading,
    };
  }
};
