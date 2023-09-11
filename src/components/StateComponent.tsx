import { Box, LinearProgress, Stack, Typography } from "@mui/material";

import { useCRUD } from "../hooks/useCRUD";
import { useGenerateId } from "../hooks/useGenerateId";
import { API, Element, ElementId, Manager, Settings } from "../types";
import { ResultsTable } from "./ResultsTable";

type Props = {
  settings: Settings;
  api: API<Element, Element[]>;
  manager: Manager;
};

export function StateComponent({ settings, api, manager }: Props) {
  const { hideResults } = settings;

  // Hook to interact with the data
  const { loading, data, error, add, remove, clear, fetch } = useCRUD<
    Element,
    Element[]
  >({
    api,
    manager,
  });

  // Layer for getting new ids
  const { generateId } = useGenerateId();

  const addHandler = () => add({ id: generateId(), creationDate: Date.now() });
  const removeHandler = (id: ElementId) => remove(id);
  const fetchHandler = () => fetch();
  const clearHandler = () => clear();

  return (
    <Stack direction="column" spacing={2} justifyContent="center">
      <Box>
        <span>LOADING: </span>
        {loading ? <LinearProgress /> : "false"}
      </Box>

      <Box>
        <Typography mt={2}>
          Error: &nbsp;<span>{JSON.stringify(error?.message)}</span>
        </Typography>
      </Box>

      {loading && hideResults ? (
        <></>
      ) : (
        <ResultsTable
          data={data}
          add={addHandler}
          remove={removeHandler}
          fetch={fetchHandler}
          clear={clearHandler}
        ></ResultsTable>
      )}
    </Stack>
  );
}
