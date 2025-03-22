function getUnixTimestamp() {
  return Math.floor(Date.now() / 1000)
}

function userHasAccess(user) {
  return user?.planActive
}

export default userHasAccess
