export const ACTION_LOGIN = Symbol()
export const ACTION_LOGOUT = Symbol()
export const ACTION_PULL_DATA = Symbol()
export const ACTION_SET_VISIBILITY = Symbol()
export const ACTION_CHANGE_LANG = Symbol()
export const ACTION_INIT_DATA = Symbol()

export const actionLogin = data => ({
  type: ACTION_LOGIN,
  data
})
export const actionInitData = data => ({
  type: ACTION_INIT_DATA,
  data
})

export const actionLogout = data => ({
  type: ACTION_LOGOUT,
  data
})

export const actionChangeLang = data => ({
  type: ACTION_CHANGE_LANG,
  data
})

export const actionSetVisibility = data => ({
  type: ACTION_SET_VISIBILITY,
  data
})
