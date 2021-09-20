
import { createStore } from 'vuex'

import store from './store.js'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      store
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: true
  })

  return Store
}
