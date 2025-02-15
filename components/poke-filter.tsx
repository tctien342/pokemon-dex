import { usePokeTypes } from "@/hooks/queries/use-poke-types";
import { useCallback, useMemo } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export const PokeFilter: IComponent<{
  pickedFilters: string[];
  onPickFilter: (filter: string[]) => void;
}> = ({ onPickFilter, pickedFilters }) => {
  const { data: pokeTypes, isLoading } = usePokeTypes();

  const handleToggleFilter = useCallback(
    (filter: string) => {
      if (pickedFilters.includes(filter)) {
        onPickFilter(
          pickedFilters.filter((pickedFilter) => pickedFilter !== filter)
        );
      } else {
        onPickFilter([...pickedFilters, filter]);
      }
    },
    [onPickFilter, pickedFilters]
  );

  const renderFilters = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-10 flex items-center border px-2">
          <Skeleton className="w-16 h-4" />
        </div>
      ));
    }
    return pokeTypes?.results.map((type) => (
      <Button
        key={type.name}
        variant={pickedFilters.includes(type.name) ? "default" : "secondary"}
        onClick={() => handleToggleFilter(type.name)}
        className="h-10 flex items-center border px-2"
      >
        <code>{type.name}</code>
      </Button>
    ));
  }, [handleToggleFilter, isLoading, pickedFilters, pokeTypes?.results]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span>Types:</span>
      {renderFilters}
    </div>
  );
};
