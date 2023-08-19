import * as React from 'react';
import './App.css'
import Router from '@/router/Router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import { useDarkMode } from 'usehooks-ts'
import { darkTheme } from "@/themes/dark.theme";
import { lightTheme } from "@/themes/light.theme";
import { CustomerApi } from './api/customer/endpoints';
import { customerActions } from './store/customer';
import { DriverApi } from './api/driver/endpoints';
import { driverActions } from './store/driver';

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
  useQuery(['vechile'], SettingApi.fetchVehicle, {
    onSuccess: (data: { response: { name: string, id: string }[]; }) => {
      dispatch(settingActions.setVehicle(data.response))
    },
  })
  useQuery(['customerName'], CustomerApi.getCustomerNames, {
    onSuccess: (data: { response: { fullName: string, id: string }[]; }) => {
      dispatch(customerActions.setCustomerNames(data.response))
    },
  })
  useQuery(['driverName'], DriverApi.getDriverNames, {
    onSuccess: (data: { response: { fullName: string, id: string }[]; }) => {
      dispatch(driverActions.setDriverNames(data.response))
    },
  })

  return <> {props.children} </>
}

export default function App() {

  const { isDarkMode } = useDarkMode(false);
  const activeTheme = React.useMemo(() => isDarkMode ? darkTheme : lightTheme, [isDarkMode])

  React.useEffect(() => {
    // Set body dark class To turn on dark mode in tailwind css
    isDarkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark')

  }, [isDarkMode])

  return (
    <div className="App">

      {/* <ColorModeContext.Provider value={colorMode}> */}
      <ThemeProvider theme={activeTheme}>
        <QueryClientProvider client={qyeryClient}>
          <StartupCalls />
          <RTL>
            <CssBaseline />
            <Router></Router>
          </RTL>
        </QueryClientProvider>
        <ToastContainer />
      </ThemeProvider>
      {/* </ColorModeContext.Provider> */}

    </div >
  )
}

