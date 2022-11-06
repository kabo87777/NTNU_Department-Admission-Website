import { reactive, watch, onScopeDispose, toRefs, readonly } from 'vue-demi';
import { useQueryClient } from './useQueryClient.esm.js';
import { updateState, isQueryKey, cloneDeepUnref } from './utils.esm.js';

function useBaseQuery(Observer, arg1, arg2 = {}, arg3 = {}) {
  var _options$queryClient;

  const options = getQueryUnreffedOptions();
  const queryClient = (_options$queryClient = options.queryClient) != null ? _options$queryClient : useQueryClient(options.queryClientKey);
  const defaultedOptions = queryClient.defaultQueryOptions(options);
  const observer = new Observer(queryClient, defaultedOptions);
  const state = reactive(observer.getCurrentResult());
  const unsubscribe = observer.subscribe(result => {
    updateState(state, result);
  });
  watch([() => arg1, () => arg2, () => arg3], () => {
    observer.setOptions(queryClient.defaultQueryOptions(getQueryUnreffedOptions()));
  }, {
    deep: true
  });
  onScopeDispose(() => {
    unsubscribe();
  });

  const suspense = () => {
    return new Promise(resolve => {
      const run = () => {
        const newOptions = queryClient.defaultQueryOptions(getQueryUnreffedOptions());

        if (newOptions.enabled !== false) {
          const optimisticResult = observer.getOptimisticResult(newOptions);

          if (optimisticResult.isStale) {
            resolve(observer.fetchOptimistic(defaultedOptions));
          } else {
            resolve(optimisticResult);
          }
        }
      };

      run();
      watch([() => arg1, () => arg2, () => arg3], run, {
        deep: true
      });
    });
  };

  return { ...toRefs(readonly(state)),
    suspense
  };
  /**
   * Get Query Options object
   * All inner refs unwrapped. No Reactivity
   */

  function getQueryUnreffedOptions() {
    let mergedOptions;

    if (!isQueryKey(arg1)) {
      // `useQuery(optionsObj)`
      mergedOptions = arg1;
    } else if (typeof arg2 === 'function') {
      // `useQuery(queryKey, queryFn, optionsObj?)`
      mergedOptions = { ...arg3,
        queryKey: arg1,
        queryFn: arg2
      };
    } else {
      // `useQuery(queryKey, optionsObj?)`
      mergedOptions = { ...arg2,
        queryKey: arg1
      };
    }

    return cloneDeepUnref(mergedOptions);
  }
}

export { useBaseQuery };
//# sourceMappingURL=useBaseQuery.esm.js.map
