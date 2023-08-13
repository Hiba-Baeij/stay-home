import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FullScreen from "@/components/layouts/FullScreen"
import Dashboard from "@/components/layouts/Dashboard"
import ResetPassword from "@/pages/resetPassword"
import Signup from "@/pages/signup"
import Home from '@/pages/home';
import Login from '@/pages/login';
import Customer from '@/pages/customers/customer'
import Notification from '@/pages/notifications/notifiation'
import Driver from '@/pages/drivers/driver'
import Employee from '@/pages/employees/employee'
import Order from '@/pages/orders/order'
import Setting from '@/pages/settings/setting'
import Shop from '@/pages/shops/shop'
import Vehicle from '@/pages/vehicles/vehicle'
import Rating from '@/pages/ratings/rating'
import DriverDetails from '@/pages/drivers/driverDetails';
import { IsLoggedIn } from '@/global/auth'
import ShopDetails from '../pages/shops/shopDetails';
const routeList = [
    {
        path: '/',
        key: 'home',
        component: Home,
        layout: Dashboard
    },
    {
        path: '/login',
        key: 'login',
        component: Login,
        layout: FullScreen
    },
    {
        path: '/signup',
        key: 'signup',
        component: Signup,
        layout: FullScreen
    },
    {
        path: '/resetPassword',
        key: 'resetPassword',
        component: ResetPassword,
        layout: FullScreen
    },
    {
        path: '/customers',
        key: 'customer',
        component: Customer,
        layout: Dashboard
    },
    {
        path: '/drivers',
        key: 'driver',
        component: Driver,
        layout: Dashboard
    },
    {
        path: '/employees',
        key: 'employee',
        component: Employee,
        layout: Dashboard
    },
    {
        path: '/notifications',
        key: 'notification',
        component: Notification,
        layout: Dashboard
    },
    {
        path: '/orders',
        key: 'order',
        component: Order,
        layout: Dashboard
    },
    {
        path: '/settings',
        key: 'setting',
        component: Setting,
        layout: Dashboard
    },
    {
        path: '/shops',
        key: 'shop',
        component: Shop,
        layout: Dashboard
    },
    {
        path: '/ratings',
        key: 'rating',
        component: Rating,
        layout: Dashboard
    },
    {
        path: '/vehicles',
        key: 'vehicle',
        component: Vehicle,
        layout: Dashboard
    },
    {
        path: '/vehicles',
        key: 'vehicle',
        component: Vehicle,
        layout: Dashboard
    },


]
function Router() {
    return (
        <Routes>
            {
                routeList.map(ele => (
                    <Route key={ele.key} path={`/${ele.path}`} element={
                        <div className='h-screen'>
                            <ele.layout>
                                <ele.component />
                            </ele.layout>
                        </div>
                    }>
                    </Route>
                ))
            }
            <Route path={`/driver/:id`} element={
                <div className='h-screen'>
                    <Dashboard>
                        <DriverDetails />
                    </Dashboard>
                </div>
            }>
            </Route>
            <Route path={`/shop/:id`} element={
                <div className='h-screen'>
                    <Dashboard>
                        <ShopDetails />
                    </Dashboard>
                </div>
            }>
            </Route>

        </Routes>

    )
}

export default Router