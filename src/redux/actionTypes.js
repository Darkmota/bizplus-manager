export const ACTION_LOGIN = Symbol()
export const ACTION_LOGOUT = Symbol()
export const ACTION_PULL_DATA = Symbol()
export const ACTION_SET_VISIBILITY = Symbol()

export const actionLogin = data => ({
  type: ACTION_LOGIN,
  data
})

export const actionLogout = data => ({
  type: ACTION_LOGOUT,
  data
})

export const actionSetVisibility = data => ({
  type: ACTION_SET_VISIBILITY,
  data
})
