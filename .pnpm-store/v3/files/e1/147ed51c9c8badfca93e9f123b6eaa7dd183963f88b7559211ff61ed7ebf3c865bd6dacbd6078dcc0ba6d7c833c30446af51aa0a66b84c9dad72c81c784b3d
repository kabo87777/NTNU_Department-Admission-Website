'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vueDemi = require('vue-demi');
var useQueryClient = require('./useQueryClient.js');
var utils = require('./utils.js');

function useIsMutating(arg1, arg2) {
  var _filters$value$queryC;

  const filters = vueDemi.ref(parseMutationFilterArgs(arg1, arg2));
  const queryClient = (_filters$value$queryC = filters.value.queryClient) != null ? _filters$value$queryC : useQueryClient.useQueryClient(filters.value.queryClientKey);
  const isMutating = vueDemi.ref(queryClient.isMutating(filters));
  const unsubscribe = queryClient.getMutationCache().subscribe(() => {
    isMutating.value = queryClient.isMutating(filters);
  });
  vueDemi.watch([() => arg1, () => arg2], () => {
    filters.value = parseMutationFilterArgs(arg1, arg2);
    isMutating.value = queryClient.isMutating(filters);
  }, {
    deep: true
  });
  vueDemi.onScopeDispose(() => {
    unsubscribe();
  });
  return isMutating;
}
function parseMutationFilterArgs(arg1, arg2 = {}) {
  let options;

  if (utils.isQueryKey(arg1)) {
    options = { ...arg2,
      mutationKey: arg1
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    options = arg1 || {};
  }

  return utils.cloneDeepUnref(options);
}

exports.parseMutationFilterArgs = parseMutationFilterArgs;
exports.useIsMutating = useIsMutating;
//# sourceMappingURL=useIsMutating.js.map
