import * as types from '@/store/mutationTypes'
const matutaions = {
  [types.SET_USER](state,data){
    state.user=data
  },
  [types.SET_TOKEN](state,data){
    state.token=data
  },
  [types.SET_COMMENT](state,data){
    state.comments=data
  }
}

export default matutaions