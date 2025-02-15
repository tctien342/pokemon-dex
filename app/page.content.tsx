"use client";
import { PokeCard } from "@/components/poke-card";
import { PokeFilter } from "@/components/poke-filter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePokeList } from "@/hooks/queries/use-poke-list";
import { useSearchQueryState } from "@/hooks/use-search-query-state";
import { useEffect, useMemo, useState } from "react";

const ITEM_PER_PAGE = 24;

export const HomePageContent: IComponent = () => {
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [page, setPage] = useSearchQueryState("page", "0");
  const [filterTypes, setFilterTypes] = useSearchQueryState<string[]>(
    "types",
    []
  );
  const {
    data: pokeList,
    isLoading,
    isError,
  } = usePokeList({
    types: filterTypes ?? [],
    offset: Number(page || "0") * ITEM_PER_PAGE,
    limit: ITEM_PER_PAGE,
  });

  const handleUpdateFilter = (types: string[]) => {
    setFilterTypes(types);
    setPage("0");
  };
  const handleNextPage = () => {
    setPage(String(Number(page!) + 1));
  };

  const handlePrevPage = () => {
    setPage(String(Number(page!) - 1));
  };

  useEffect(() => {
    if (!!pokeList?.count) {
      setTotalCount(pokeList.count);
    }
  }, [pokeList]);

  const renderCount = useMemo(() => {
    if (isLoading && !totalCount) {
      return <Skeleton className="w-12 h-2" />;
    }
    if (isError) {
      return "-";
    }
    return totalCount;
  }, [isError, isLoading, totalCount]);

  return (
    <div className="w-full overflow-auto flex gap-4 flex-col max-w-5xl px-4 mx-auto">
      <code className="mx-auto text-xl py-8">Welcome to Pokemon world</code>
      <div className="flex gap-2 items-center">
        <span>TOTAL COUNT:</span>
        {renderCount}
      </div>
      <PokeFilter
        pickedFilters={filterTypes ?? []}
        onPickFilter={handleUpdateFilter}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 pb-16">
        {isLoading
          ? Array.from({ length: 24 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="w-[159px] h-[190px] aspect-square mx-auto"
              />
            ))
          : pokeList?.results.map((poke) => (
              <PokeCard key={poke.name} name={poke.name} />
            ))}
        {(pokeList?.results.length === 0 || isError) && (
          <div className="col-span-6 text-center text-gray-500 my-24">
            No Pokemon found
          </div>
        )}
      </div>
      {!!totalCount && (
        <div className="fixed bottom-4 right-4 flex gap-2">
          {Number(page) > 0 && (
            <Button title="Previous Page" onClick={handlePrevPage}>
              Previous Page
            </Button>
          )}
          {(Number(page) + 1) * ITEM_PER_PAGE < totalCount && (
            <Button title="Next Page" onClick={handleNextPage}>
              Next Page
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
