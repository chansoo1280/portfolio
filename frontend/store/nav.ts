export const state = () => ({
  active_idx: 0,
  disabled: false,
})

export const mutations = {
  setIdx(state: any, idx: number) {
    state.active_idx = idx
  },
  setDisabled(state: any, type: boolean) {
    state.disabled = type
  },
}
export const actions = {
  setIdx({ commit }: any, idx: number) {
    commit('setIdx', idx)
  },
  setDisabled({ commit }: any, type: boolean) {
    commit('setDisabled', type)
  },
}
