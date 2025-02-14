import { useState } from 'react';

import { API, Manager } from '../types';

type Props<T, Z> = { api: API<T, Z>; manager: Manager };

export function useCRUD<T = unknown, Z = unknown>({ api, manager }: Props<T, Z>) {
  type Status = {
    error?: Error;
    data?: Z;
  };

  const { addElementRequest, removeElementRequest, updateElementRequest, removeAllElementsRequest, fetchDataRequest } =
    api;

  const { addRequest, removeRequest, isNotEmpty } = manager;

  // Reusable functions
  const updateStatusWith = (opts: Status) => {
    setStatus({ ...opts });
  };

  // Status
  const [status, setStatus] = useState<Status>({});

  // Handlers section
  const add = (element: T) => {
    const requestId = addRequest();
    addElementRequest(element)
      .then(() => {
        removeRequest(requestId);
        // Check response and fetch data again if everything was OK
        return fetch();
      })
      .catch((error: Error) => {
        removeRequest(requestId);
        updateStatusWith({ error });
      });
  };

  const remove = <U extends string>(id: U) => {
    const requestId = addRequest();
    removeElementRequest<U>(id)
      .then(() => {
        removeRequest(requestId);
        // Check response and fetch data again if everything was OK
        return fetch();
      })
      .catch((error: Error) => {
        removeRequest(requestId);
        updateStatusWith({ error });
      });
  };

  const clear = () => {
    const requestId = addRequest();
    removeAllElementsRequest()
      .then(() => {
        removeRequest(requestId);

        return fetch();
      })
      .catch((error: Error) => {
        removeRequest(requestId);
        updateStatusWith({ error });
      });
  };

  const update = (element: T) => {
    const requestId = addRequest();
    return updateElementRequest(element)
      .then(() => {
        removeRequest(requestId);
        // Check response and fetch data again if everything was OK
        return fetch();
      })
      .catch((error: Error) => {
        removeRequest(requestId);
        updateStatusWith({ error });
      });
  };

  const fetch = () => {
    // TODO: apply debounce to avoid unnecessary fetching for each action
    const requestId = addRequest();
    return fetchDataRequest()
      .then((data) => {
        removeRequest(requestId);
        updateStatusWith({ data });
      })
      .catch((error: Error) => {
        removeRequest(requestId);
        updateStatusWith({ error });
      });
  };

  return { ...status, loading: isNotEmpty, add, remove, clear, update, fetch };
}
