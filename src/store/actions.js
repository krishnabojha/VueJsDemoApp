export default {
  addExpense: ({ commit }, payload) => {
    commit('appendExpense', payload)
  }
}
