// Lấy token từ localStorage
const getAuthTokenFromPersistLocalStorage = (): string | null => {
  try {
    const persistedStateString = localStorage.getItem('persist:root');
    const persistedState = persistedStateString ? JSON.parse(persistedStateString) : null;
    if (persistedState && persistedState.auth) {
      const auth = JSON.parse(persistedState.auth);
      if (auth.token) {
        return auth.token;
      }
    }
  } catch (error) {
    console.error('Error getting token from local storage:', error);
  }
  return null;
}

// Lấy thông tin người dùng từ localStorage
const getAuthUserFromPersistLocalStorage = (): any | null => {
  try {
    const persistedStateString = localStorage.getItem('persist:root');
    const persistedState = persistedStateString ? JSON.parse(persistedStateString) : null;
    if (persistedState && persistedState.auth) {
      const auth = JSON.parse(persistedState.auth);
      if (auth.user) {
        return auth.user;
      }
    }
  } catch (error) {
    console.error('Error getting user from local storage:', error);
  }
  return null;
}

const getAuthTokenFromLocalStorage = (): string | null => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth.token) {
      return auth.token;
    }
  } catch (error) {
    console.error('Error getting token from local storage:', error);
  }
  return null;
}

const getAuthUserFromLocalStorage = (): any | null => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth.user) {
      return auth.user;
    }
  } catch (error) {
    console.error('Error getting user from local storage:', error);
  }
  return null;
}

const LocalStorageUtil = {
  getAuthTokenFromPersistLocalStorage,
  getAuthUserFromPersistLocalStorage,
  getAuthTokenFromLocalStorage,
  getAuthUserFromLocalStorage
}

export { LocalStorageUtil }
