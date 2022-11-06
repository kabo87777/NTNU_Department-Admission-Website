import { ref, watch, onScopeDispose } from 'vue-demi';
import { useQueryClient } from './useQueryClient.mjs';
import { isQueryKey, cloneDeepUnref } from './utils.mjs';

function useIsFetching(arg1, arg2) {
  var _filters$value$queryC;

  const filters = ref(parseFilterArgs(arg1, arg2));
  const queryClient = (_filters$value$queryC = filters.value.queryClient) != null ? _filters$value$queryC : useQueryClient(filters.value.queryClientKey);
  const isFetching = ref(queryClient.isFetching(filters));
  const unsubscribe = queryClient.getQueryCache().subscribe(() => {
    isFetching.value = queryClient.isFetching(filters);
  });
  watch([() => arg1, () => arg2], () => {
    filters.value = parseFilterArgs(arg1, arg2);
    isFetching.value = queryClient.isFetching(filters);
  }, {
    deep: true
  });
  onScopeDispose(() => {
    unsubscribe();
  });
  return isFetching;
}
function parseFilterArgs(arg1, arg2 = {}) {
  let options;

  if (isQueryKey(arg1)) {
    options = { ...arg2,
      queryKey: arg1
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    options = arg1 || {};
  }

  return cloneDeepUnref(options);
}

export { parseFilterArgs, useIsFetching };
//# sourceMappingURL=useIsFetching.mjs.map
