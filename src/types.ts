// eslint-disable-next-line sonarjs/redundant-type-aliases
export type ElementId = string;
export type Element = {
  id: ElementId;
  creationDate: number;
};

export type API<T = unknown, Z = unknown> = {
  addElementRequest: (element: T) => Promise<T>;
  removeElementRequest: <U extends string>(id: U) => Promise<void>;
  fetchDataRequest: () => Promise<Z>;
  removeAllElementsRequest: () => Promise<void>;
  updateElementRequest: (element: T) => Promise<T>;
};

// eslint-disable-next-line sonarjs/redundant-type-aliases
export type ApiRequest = number;

export type Manager = {
  addRequest: () => ApiRequest;
  removeRequest: (requestId: ApiRequest) => void;
  isNotEmpty: boolean;
};

export type Settings = {
  withErrors: boolean;
  delay: number;
  hideResults: boolean;
};
