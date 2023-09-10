import { v4 } from "uuid";

export function useGenerateId() {
  const generateId = () => v4();

  return { generateId };
}
