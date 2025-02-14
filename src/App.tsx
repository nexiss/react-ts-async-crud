import { Container, Grid, Paper, Stack, styled, Typography } from '@mui/material';

import { SettingsComponent } from './components/SettingsComponent';
import { StateComponent } from './components/StateComponent';
import { useElementsAPI } from './hooks/useElementsAPI';
import { useRequestManager } from './hooks/useRequestManager';
import { useSettings } from './hooks/useSettings';

// Takes the Paper style and adds the custom theme to it
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const App = () => {
  const [settings, setSettings] = useSettings();

  const { withErrors, delay } = settings;

  // This two hooks could be part of the useCRUD, but I prefer the IoC way
  const api = useElementsAPI({ withErrors, delay });
  const manager = useRequestManager();

  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <SettingsComponent settings={settings} onChange={setSettings}></SettingsComponent>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Stack direction="column" spacing={2} justifyContent="center" textAlign={'center'}>
              <Typography variant="h4">State</Typography>
              <p>
                Press <strong>Fetch</strong> button for fetching data.&nbsp;
                <strong>Add/Remove</strong>&nbsp;actions will trigger an extra fetch if they success.
              </p>
              <p>
                If parallel requests are triggered, progress bar will remain displayed since the first request is
                triggered until the last one has finished
              </p>
              <p>You can open the console to see how actions are performed under the hood</p>
              <StateComponent settings={settings} api={api} manager={manager}></StateComponent>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};
