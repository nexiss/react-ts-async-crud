import { useEffect, useRef, useState } from "react";

import { Element, ElementId } from "../types";

// Abstraction to reduce code
const doReject = (reject: (reason: Error) => void, message: string) => {
  const error = new Error(message);
  console.log(error.message);
  reject(error);
};

type Props = {
  withErrors?: boolean;
  delay?: number;
};

const DEFAULT_PROPS: Props = { withErrors: false, delay: 1000 };

export function useElementsAPI(props?: Props) {
  const { withErrors, delay } = { ...DEFAULT_PROPS, ...props };

  const [elements, setElements] = useState([] as Element[]);

  const addElementRequest = (element: Element): Promise<Element> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (withErrors) {
          doReject(reject, "Something when wrong when adding new element");
        } else {
          console.log("Adding element to the persistence layer: ", element);
          setElements((prev) => [...prev, element]);
          resolve(element);
        }
      }, delay);
    });
  };

  const removeElementRequest = (id: ElementId): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (withErrors) {
          doReject(reject, "Something when wrong when removing element");
        } else {
          console.log("Removing element from the persistence layer: ", id);
          setElements((prev) => {
            const index = prev.findIndex(
              (prevElement) => prevElement.id === id
            );

            if (index >= 0) {
              const newArr = [...prev];
              newArr.splice(index, 1);
              return newArr;
            }
            return prev;
          });

          resolve();
        }
      }, delay);
    });
  };

  const updateElementRequest = (element: Element): Promise<Element> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (withErrors) {
          doReject(reject, "Something went wrong when updating element");
        } else {
          console.log("Updating element to the persistence layer: ", element);
          setElements((prev) =>
            prev.map((prevElement) =>
              prevElement.id === element.id ? element : prevElement
            )
          );
          resolve(element);
        }
      }, delay);
    });
  };

  // Not sure why useRef + useEffect is needed for the fetchDataRequest to work propertly
  const ref = useRef(elements);
  useEffect(() => {
    ref.current = elements;
  }, [elements]);

  const fetchDataRequest = (): Promise<Element[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (withErrors) {
          doReject(reject, "Something went wrong when fetching data");
        } else {
          console.log("fetching: ", ref.current);
          resolve(ref.current);
        }
      }, delay);
    });
  };

  return {
    addElementRequest,
    removeElementRequest,
    updateElementRequest,
    fetchDataRequest,
  };
}
