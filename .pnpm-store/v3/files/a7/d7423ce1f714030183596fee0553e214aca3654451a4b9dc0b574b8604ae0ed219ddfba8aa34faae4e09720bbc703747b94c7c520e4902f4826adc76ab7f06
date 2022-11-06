import { QueriesObserver } from '@tanstack/query-core';
import { reactive, watch, onScopeDispose, readonly } from 'vue-demi';
import { useQueryClient } from './useQueryClient.mjs';
import { cloneDeepUnref } from './utils.mjs';

/* eslint-disable @typescript-eslint/no-explicit-any */

function useQueries({
  queries
}) {
  const unreffedQueries = cloneDeepUnref(queries);
  const queryClientKey = unreffedQueries[0].queryClientKey;
  const optionsQueryClient = unreffedQueries[0].queryClient;
  const queryClient = optionsQueryClient != null ? optionsQueryClient : useQueryClient(queryClientKey);
  const defaultedQueries = unreffedQueries.map(options => {
    return queryClient.defaultQueryOptions(options);
  });
  const observer = new QueriesObserver(queryClient, defaultedQueries);
  const state = reactive(observer.getCurrentResult());
  const unsubscribe = observer.subscribe(result => {
    state.splice(0, state.length, ...result);
  });
  watch(() => queries, () => {
    const defaulted = cloneDeepUnref(queries).map(options => {
      return queryClient.defaultQueryOptions(options);
    });
    observer.setQueries(defaulted);
  }, {
    deep: true
  });
  onScopeDispose(() => {
    unsubscribe();
  });
  return readonly(state);
}

export { useQueries };
//# sourceMappingURL=useQueries.mjs.map
