'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vueDemi = require('vue-demi');
var useQueryClient = require('./useQueryClient.js');
var utils = require('./utils.js');

function useIsFetching(arg1, arg2) {
  var _filters$value$queryC;

  const filters = vueDemi.ref(parseFilterArgs(arg1, arg2));
  const queryClient = (_filters$value$queryC = filters.value.queryClient) != null ? _filters$value$queryC : useQueryClient.useQueryClient(filters.value.queryClientKey);
  const isFetching = vueDemi.ref(queryClient.isFetching(filters));
  const unsubscribe = queryClient.getQueryCache().subscribe(() => {
    isFetching.value = queryClient.isFetching(filters);
  });
  vueDemi.watch([() => arg1, () => arg2], () => {
    filters.value = parseFilterArgs(arg1, arg2);
    isFetching.value = queryClient.isFetching(filters);
  }, {
    deep: true
  });
  vueDemi.onScopeDispose(() => {
    unsubscribe();
  });
  return isFetching;
}
function parseFilterArgs(arg1, arg2 = {}) {
  let options;

  if (utils.isQueryKey(arg1)) {
    options = { ...arg2,
      queryKey: arg1
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    options = arg1 || {};
  }

  return utils.cloneDeepUnref(options);
}

exports.parseFilterArgs = parseFilterArgs;
exports.useIsFetching = useIsFetching;
//# sourceMappingURL=useIsFetching.js.map
