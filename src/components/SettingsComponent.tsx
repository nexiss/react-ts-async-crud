import { Box, Typography } from '@mui/material';

import { Settings } from '../types';

type Props = {
  settings: Settings;
  onChange: (settings: Settings) => void;
};

export function SettingsComponent({ settings, onChange }: Readonly<Props>) {
  const { withErrors, hideResults, delay } = settings;

  return (
    <>
      <Typography variant="h4">Settings</Typography>
      <Box>
        <label>
          <input
            type="checkbox"
            defaultChecked={withErrors}
            onChange={() => onChange({ ...settings, withErrors: !withErrors })}
          />
          Force requests to fail
        </label>
      </Box>
      <Box>
        <label>
          <input
            type="checkbox"
            defaultChecked={hideResults}
            onChange={() => onChange({ ...settings, hideResults: !hideResults })}
          />
          Hide results while loading
        </label>
      </Box>
      <Box>
        <label>
          <input
            type="number"
            value={delay}
            onChange={(event) => onChange({ ...settings, delay: Number(event.target.value) })}
          />
          Delay for each request
        </label>
      </Box>
    </>
  );
}
