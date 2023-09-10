import { Element, ElementId } from "../types";

type Props = {
  data: Element[] | undefined;
  remove: (id: ElementId) => void;
  add: () => void;
  fetch: () => void;
};

export function ResultsTable({ data, add, remove, fetch }: Props) {
  return (
    <>
      <div>
        <button onClick={fetch}>Fetch</button>
        <button onClick={add}>Add</button>
      </div>
      {data && (
        <table border={10}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Creation date</th>
              <th>- X -</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.creationDate}</td>
                <td>
                  <button onClick={() => remove(element.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
