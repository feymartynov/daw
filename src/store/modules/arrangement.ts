import { Module } from 'vuex';
import { RootState } from '../index';

export interface Track {
  id: string,
  name: string,
}

export interface TrackListItem {
  track: Track,
  active: boolean,
}

export interface ArrangementState {
  tracks: Array<TrackListItem>,
}

export const arrangement: Module<ArrangementState, RootState> = {
  namespaced: false,
  state: {
    tracks: [],
  },
  getters: {
    tracks: (state): Array<TrackListItem> => {
      return state.tracks;
    }
  },
  actions: {
    addTrack({ commit }, track: Track): void {
      commit('trackAdded', track);
    },
    switchActiveTrack({ commit }, track: Track): void {
      commit('activeTrackSwitched', track);
    }
  },
  mutations: {
    trackAdded(state, track: Track): void {
      for (let item of state.tracks) item.active = false;
      state.tracks.push({track, active: true});
    },
    activeTrackSwitched(state, track: Track): void {
      for (let item of state.tracks) {
        if (item.track === track) {
          item.active = true;
        } else if (item.active) {
          item.active = false;
        }
      }
    }
  },
};
