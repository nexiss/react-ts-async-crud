import { uuid } from '../uuid';

export function useGenerateId() {
  const generateId = () => uuid();

  return { generateId };
}
