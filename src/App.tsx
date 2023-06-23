import * as React from 'react';
import './App.css'
import Router from './components/Router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';
import { isDarkMode } from './theme';
import { ColorModeContext } from './components/layout/Dashboard';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { QueryClientProvider, QueryClient, useQuery } from "@tanstack/react-query"
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { SettingApi } from './api/setting/endpoints';
import { Area, settingActions } from './store/setting';

// import 'https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap';

const stylisPlugins = [prefixer];
const qyeryClient = new QueryClient()
const htmlDir = document.querySelector('html');
if (htmlDir?.dir === 'rtl') {
  stylisPlugins.push(rtlPlugin)
}

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins,

});

function RTL(props: any) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}


const StartupCalls = (props: React.PropsWithChildren) => {
  const dispatch = useDispatch<AppDispatch>()

  useQuery(['area'], SettingApi.fetchArea, {
    onSuccess: (data: { response: Area[]; }) => {
      dispatch(settingActions.setArea(data.response))
    },
  })
  useQuery(['city'], SettingApi.fetchCity, {
    onSuccess: (data: { response: { name: string, id: string }[]; }) => {
      dispatch(settingActions.setCity(data.response))
    },
  })
  useQuery(['category'], SettingApi.fetchCategory, {
    onSuccess: (data: { response: { name: string, id: string }[]; }) => {
      dispatch(settingActions.setCategory(data.response))
    },
  })

  return <> {props.children} </>
}

export default function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        localStorage.setItem("mode", mode === 'light' ? 'dark' : 'light');
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );

      },
    }),
    [],
  );
  // console.log(mode)
  React.useEffect(() => {
    let modeVal = localStorage.getItem("mode") as PaletteMode
    if (modeVal) {
      setMode(modeVal)
    }
  }, [])

  const theme = React.useMemo(() => createTheme(isDarkMode(mode)), [mode]);
  return (
    <div className="App">

      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={qyeryClient}>
            <StartupCalls />

            <RTL>
              <CssBaseline />
              <Router></Router>
            </RTL>
          </QueryClientProvider>
          <ToastContainer />
        </ThemeProvider>
      </ColorModeContext.Provider>

    </div >
  )
}

