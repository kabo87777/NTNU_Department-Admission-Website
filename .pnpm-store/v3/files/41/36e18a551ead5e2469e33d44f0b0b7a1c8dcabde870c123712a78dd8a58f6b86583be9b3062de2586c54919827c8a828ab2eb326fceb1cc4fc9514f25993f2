'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var queryCore = require('@tanstack/query-core');
var vueDemi = require('vue-demi');
var useQueryClient = require('./useQueryClient.js');
var utils = require('./utils.js');

/* eslint-disable @typescript-eslint/no-explicit-any */

function useQueries({
  queries
}) {
  const unreffedQueries = utils.cloneDeepUnref(queries);
  const queryClientKey = unreffedQueries[0].queryClientKey;
  const optionsQueryClient = unreffedQueries[0].queryClient;
  const queryClient = optionsQueryClient != null ? optionsQueryClient : useQueryClient.useQueryClient(queryClientKey);
  const defaultedQueries = unreffedQueries.map(options => {
    return queryClient.defaultQueryOptions(options);
  });
  const observer = new queryCore.QueriesObserver(queryClient, defaultedQueries);
  const state = vueDemi.reactive(observer.getCurrentResult());
  const unsubscribe = observer.subscribe(result => {
    state.splice(0, state.length, ...result);
  });
  vueDemi.watch(() => queries, () => {
    const defaulted = utils.cloneDeepUnref(queries).map(options => {
      return queryClient.defaultQueryOptions(options);
    });
    observer.setQueries(defaulted);
  }, {
    deep: true
  });
  vueDemi.onScopeDispose(() => {
    unsubscribe();
  });
  return vueDemi.readonly(state);
}

exports.useQueries = useQueries;
//# sourceMappingURL=useQueries.js.map
