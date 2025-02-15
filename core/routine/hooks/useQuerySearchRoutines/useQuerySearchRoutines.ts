import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient, UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
import { searchRoutines } from '../../actions/routine-actions';
import useDebounce from '@/core/shared/hooks/useDebounce';
import type { Routine } from '../../interfaces/routine';
import type { Paged } from '@/core/shared/interfaces/search';

type QueryFilterResult = {
  filtersState: Record<string, string>;
  setFiltersState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

type UseQuerySearchRoutinesResult =
  UseInfiniteQueryResult<InfiniteData<Paged<Routine>>, Error> &
  QueryFilterResult;

const useQuerySearchRoutines = (
  filterParams: Record<string, string>
): UseQuerySearchRoutinesResult => {
  const [filtersState, setFiltersState] = useState<Record<string, string>>({ ...filterParams });
  const debounceFilters = useDebounce(filtersState, 500);
  const queryClient = useQueryClient();
  const query = useInfiniteQuery<
    Paged<Routine>,
    Error,
    InfiniteData<Paged<Routine>>,
    unknown[],
    number
  >({
    queryKey: ['search-routines', debounceFilters],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await searchRoutines({ ...debounceFilters, page: pageParam.toString() });

      return response ?? { results: [], currentPage: 1, sizeLimit: 10, total: 0, pages: 1 };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.pages) {
        return lastPage.currentPage + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    enabled: true,
  });

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['search-routines'] });
    query.refetch();
  }, [debounceFilters]);

  return { ...query, filtersState: debounceFilters, setFiltersState };
};

export default useQuerySearchRoutines;
