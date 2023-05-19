import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { sidebarList } from "@/components/layout/Dashboard"
import FullScreen from "@/components/layout/FullScreen"
import ResetPassword from "@/pages/resetPassword"
import Signup from "@/pages/signup"
import { Login } from '@mui/icons-material'
function Router() {
    return (
        <Routes>
            {
                sidebarList.map(ele => (

                    <Route key={ele.name} path={`/${ele.path}`} element={
                        <div className='h-screen'>
                            <ele.layout>
                                <ele.component />
                            </ele.layout>
                        </div>
                    }
                    >

                    </Route>
                ))
            }

            <Route key='login' path='/login' element={
                <div className='h-screen'>
                    <FullScreen>
                        <Login />
                    </FullScreen>
                </div>
            }
            >
            </Route>
            <Route key='resetPassword' path='/resetPassword' element={
                <div className='h-screen'>
                    <FullScreen>
                        <ResetPassword />
                    </FullScreen>
                </div>
            }
            >
            </Route>
            <Route key='signup' path='/signup' element={
                <div className='h-screen'>
                    <FullScreen>
                        <Signup />
                    </FullScreen>
                </div>
            }
            >
            </Route>

        </Routes>
    )
}

export default Router