import { useState } from "react";

import { ApiRequest } from "../types";

export function useRequestManager() {
  // Estado para mantener un registro de las peticiones activas
  const [activeRequests, setActiveRequests] = useState<Record<number, boolean>>(
    {}
  );

  // Función para agregar una petición al registro activo
  const addRequest = (): ApiRequest => {
    const requestId = Date.now();
    setActiveRequests((prevRequests) => ({
      ...prevRequests,
      [requestId]: true,
    }));
    return requestId;
  };

  // Función para eliminar una petición del registro activo
  const removeRequest = (requestId: ApiRequest) => {
    setActiveRequests((prevRequests) => {
      const newRequests = { ...prevRequests };
      delete newRequests[requestId];
      return newRequests;
    });
  };

  const isNotEmpty = Object.entries(activeRequests).length > 0;

  /* // Efecto para limpiar las peticiones cuando el componente se desmonta
    useEffect(() => {
        return () => {
        // Cancelar todas las peticiones restantes al desmontar el componente
        Object.entries(activeRequests).forEach(([key, value]) => { 
            console.log(key);
            console.log(value);
            // Implementa la lógica de cancelación de la API aquí (por ejemplo, usando axios o fetch)
            // Esto depende de cómo estés realizando las peticiones en tu aplicación
            // Si estás usando axios, puedes usar el método `cancel` para cancelar la solicitud.
        });
        };
    }, [activeRequests]); */

  return { addRequest, removeRequest, isNotEmpty };
}
