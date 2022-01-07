import { useEffect, useState } from "react";

const defaultStoreName = "store";
const stores = {};

export const createStore = ({ name = defaultStoreName, ...config }) => {
  let state = config.initialState || {};
  let subscriptions = [];

  stores[name] = {
    setState: (updater) => {
      state = typeof updater === "function" ? updater(state) : updater;
      subscriptions.forEach((sub) => sub(state));
    },
    getState() {
      return state;
    },
    subscribe(updater) {
      subscriptions.push(updater);
    },
    unsubscribe(updater) {
      subscriptions = subscriptions.filter((sub) => sub !== updater);
    },
  };
};

export const useStore = (name = defaultStoreName) => {
  const store = stores[name];

  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(setState);

    return () => store.unsubscribe(setState);
  }, [store]);

  return [state, store.setState];
};
