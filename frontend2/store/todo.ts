export const state = () => ({
  list: [],
})

export const mutations = {
  add(state: { list: { text: any; done: boolean }[] }, text: any) {
    state.list.push({
      text,
      done: false,
    })
  },
  remove(state: { list: any[] }, { todo }: any) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state: any, todo: { done: boolean }) {
    todo.done = !todo.done
  },
}
export const actions = {
  add({ commit }: any, tokenStr: any) {
    commit('add', tokenStr)
  },
}
