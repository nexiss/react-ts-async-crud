import { useState } from "react";
import { BarLoader } from "react-spinners";

import { Element, ElementId } from "../src/types";
import { ResultsTable } from "./components/ResultsTable";
import { useCRUD } from "./hooks/useCRUD";
import { useElementsAPI } from "./hooks/useElementsAPI";
import { useGenerateId } from "./hooks/useGenerateId";
import { useRequestManager } from "./hooks/useRequestManager";

export const App = () => {
  // Switch that controls if the Api is gonna fail or not
  const [withErrors, setWithErrors] = useState(false);

  // Switch that controls if the Api is gonna fail or not
  const [hideResults, setHideResults] = useState(false);

  // Layer for getting new ids
  const { generateId } = useGenerateId();

  // Faking delay time on requests
  const [delay, setDelay] = useState(50);

  // This two hooks could be part of the useCRUD, but I prefer the IoC way
  const api = useElementsAPI({ withErrors, delay });
  const manager = useRequestManager();

  // Hook to interact with the data
  const { loading, data, error, add, remove, fetch } = useCRUD<
    Element,
    Element[]
  >({
    api,
    manager,
  });

  const addHandler = () => add({ id: generateId(), creationDate: Date.now() });
  const removeHandler = (id: ElementId) => remove(id);
  const fetchHandler = () => fetch();

  return (
    <div>
      <div>
        <h2>Settings</h2>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={withErrors}
              onChange={() => setWithErrors((state) => !state)}
            />
            Force requests to fail
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={hideResults}
              onChange={() => setHideResults((state) => !state)}
            />
            Hide results while loading
          </label>
        </div>
        <div>
          <label>
            <input
              type="number"
              value={delay}
              onChange={(event) => setDelay(Number(event.target.value))}
            />
            Delay for each request
          </label>
        </div>
      </div>

      <div>
        <h2>State</h2>
        <p>
          Press <strong>Fetch</strong> button for fetching data.&nbsp;
          <strong>Add/Remove</strong>&nbsp;actions will trigger an extra fetch
          if they success.
        </p>
        <p>
          You can open the console to see how actions are performed under the
          hood
        </p>
        <div>
          <span>LOADING: </span>
          {loading ? <BarLoader color="#36d7b7"></BarLoader> : "false"}
        </div>

        <div>
          <span>DATA: </span>
          {loading && hideResults ? (
            <></>
          ) : (
            <ResultsTable
              data={data}
              add={addHandler}
              remove={removeHandler}
              fetch={fetchHandler}
            ></ResultsTable>
          )}
        </div>

        <div>
          <span>Error: </span>
          <span>{JSON.stringify(error?.message)}</span>
        </div>
      </div>
    </div>
  );
};
