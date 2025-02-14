import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Fab, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { Element, ElementId } from '../types';

type Props = {
  data: Element[] | undefined;
  add: () => void;
  remove: (id: ElementId) => void;
  clear: () => void;
  fetch: () => void;
};

export function ResultsTable({ data, add, remove, clear, fetch }: Readonly<Props>) {
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Fab variant="extended" size="small" color="primary" aria-label="fetch" onClick={fetch}>
          <RefreshIcon />
          Fetch
        </Fab>
        <Fab variant="extended" size="small" color="primary" aria-label="add" onClick={add}>
          <AddIcon />
          Add
        </Fab>
        <Fab variant="extended" size="small" color="primary" aria-label="add" onClick={clear}>
          <ClearIcon />
          Clear
        </Fab>
      </Stack>

      {data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Id</TableCell>
                <TableCell align="right">Creation date</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((element, i) => (
                <TableRow key={element.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {element.id}
                  </TableCell>
                  <TableCell align="right">{element.creationDate}</TableCell>
                  <TableCell align="right">
                    <Fab
                      variant="extended"
                      size="small"
                      color="primary"
                      aria-label="remove"
                      onClick={() => remove(element.id)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
