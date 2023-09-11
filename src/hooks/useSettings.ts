import { useState } from "react";

import { Settings } from "../types";

export function useSettings() {
  return useState<Settings>({
    withErrors: false,
    delay: 50,
    hideResults: false,
  });
}
