function findUserIndexById(state, id) {
  return state.users.findIndex(user => user.id === id)
}

export function deleteUser (state, id) {
  const indexOfUser = findUserIndexById(state, id)

  state.users.splice(indexOfUser, 1)
}

export function updateUser(state, userData) {
  const indexOfUser = findUserIndexById(state, userData.id)

  state.users[indexOfUser].name = userData.name
  state.users[indexOfUser].email = userData.email
  state.users[indexOfUser].surname = userData.surname
}

export function addUser(state, newUser) {
  state.users.push(newUser)
}
