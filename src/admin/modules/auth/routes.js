import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd';

const routes = [
    {
        path: '/login',
        exact: true,
        component: Loadable({
            loader: () => import('./components/Login/Login'),
            loading: () => (<Spin size="small"/>)
        })
    },
    {
        path: '/register',
        exact: true,
        component: Loadable({
            loader: () => import('./components/Register/Register'),
            loading: () => (<Spin size="small"/>)
        })
    },

]

export default routes
