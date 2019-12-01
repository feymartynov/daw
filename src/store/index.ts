import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { arrangement } from './modules/arrangement';

export interface RootState {}

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
  },
  modules: {
    arrangement,
  }
};

export default new Vuex.Store<RootState>(store);
