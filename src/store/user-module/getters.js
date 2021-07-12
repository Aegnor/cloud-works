export function user (state) {
  return state.users
}

export function findUserByID(state) {
  return function(id) {
    return state.users.find(user => user.id === id)
  }
}
