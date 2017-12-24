function createStore({ state, actions }) {
  const listeners = [];
  let data = Object.assign({}, state);
  const _state = {};

  const stateKeys = Object.keys(state);
  for (let i = 0, l = stateKeys.length; i < l; i++) {
    const k = stateKeys[i];
    Object.defineProperty(_state, k, {
      get() {
        return data[k];
      },
      set(val) {
        data = Object.assign({}, data, {
          [k]: val,
        });

        listeners.forEach(cb => cb());
      },
      enumerable: true,
    });
  }

  return {
    listen(fn) {
      listeners.push(fn);
      return this;
    },
    actions: Object.keys(actions).reduce((acc, actionKey) => {
      const action = actions[actionKey];
      acc[actionKey] = arg => {
        action(data, arg);
        listeners.forEach(cb => cb());
      };
      return acc;
    }, {}),
    get state() {
      return _state;
    },
    set state(val) {
      throw new Error('Cannot edit state');
    },
  };
}

export { createStore };
