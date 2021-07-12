export function deleteUser ({commit}, id) {
  commit('deleteUser', id)
}

export function updateUser({commit}, userData) {
  commit('updateUser', userData)
}

export function addUser({commit}, newUser) {
  commit('addUser', newUser)
}
