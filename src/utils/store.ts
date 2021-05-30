import React from 'react';

export const persistedStore = <T>(
  name: string,
  initialState: T,
  store: (getter: T, setter: (param: T) => void) => T
): () => T => {
  return () => {
    let stateFromCookies = initialState;
    try {
      stateFromCookies = JSON.parse(localStorage.getItem(name) || '{}');
    } catch (error) {
    }

    const [state, setState] = React.useState(stateFromCookies);
    const setter = (data: T) => {
      const newState = JSON.stringify({...state, ...data});
      localStorage.setItem(name, newState);
      setState(data);
    };

    return store(state, setter);
  };
};
