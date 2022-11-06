import { ref, watch, onScopeDispose } from 'vue-demi';
import { useQueryClient } from './useQueryClient.mjs';
import { isQueryKey, cloneDeepUnref } from './utils.mjs';

function useIsMutating(arg1, arg2) {
  var _filters$value$queryC;

  const filters = ref(parseMutationFilterArgs(arg1, arg2));
  const queryClient = (_filters$value$queryC = filters.value.queryClient) != null ? _filters$value$queryC : useQueryClient(filters.value.queryClientKey);
  const isMutating = ref(queryClient.isMutating(filters));
  const unsubscribe = queryClient.getMutationCache().subscribe(() => {
    isMutating.value = queryClient.isMutating(filters);
  });
  watch([() => arg1, () => arg2], () => {
    filters.value = parseMutationFilterArgs(arg1, arg2);
    isMutating.value = queryClient.isMutating(filters);
  }, {
    deep: true
  });
  onScopeDispose(() => {
    unsubscribe();
  });
  return isMutating;
}
function parseMutationFilterArgs(arg1, arg2 = {}) {
  let options;

  if (isQueryKey(arg1)) {
    options = { ...arg2,
      mutationKey: arg1
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    options = arg1 || {};
  }

  return cloneDeepUnref(options);
}

export { parseMutationFilterArgs, useIsMutating };
//# sourceMappingURL=useIsMutating.mjs.map
