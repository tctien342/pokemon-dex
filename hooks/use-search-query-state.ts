"use client";

import { debounce } from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * This should fix the problems when have multiple useSearchQueryState instance
 */
let cacheSearch = "";

const routerDebounce = debounce((router: AppRouterInstance, url: string) => {
  router.push(url, { scroll: false });
}, 50);

type TState = string | string[] | null;

/**
 * State that base on query string
 */
export const useSearchQueryState = <T = TState>(
  key: string,
  defaultValue: T | null = null
) => {
  const query = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const setSearchQuery = (
    value: string | string[] | null,
    keepOther = true
  ): void => {
    if (!keepOther) {
      cacheSearch = "";
    } else if (!cacheSearch) {
      cacheSearch = window.location.search;
    }
    const queries = new URLSearchParams(cacheSearch);
    if (Array.isArray(value) ? value.length : !!value) {
      const setVal = Array.isArray(value) ? value.join(",") : value;
      queries.set(key, setVal!);
    } else {
      queries.delete(key);
    }
    cacheSearch = queries.toString();
    routerDebounce(router, `${pathName}?${queries.toString()}`);
  };

  const searchVal = query.get(key) as string;

  if (!searchVal?.trim()) {
    return [defaultValue, setSearchQuery] as const;
  }

  return [
    Array.isArray(defaultValue) ? searchVal.split(",") : searchVal,
    setSearchQuery,
  ] as [T, (value: T | null, keepOther?: boolean) => void];
};

export const useUpdateCacheSearch = () => {
  const query = useSearchParams();

  useEffect(() => {
    cacheSearch = window.location.search;
  }, [query]);
};
