import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd';

const routes = [
    {
        path: '/',
        exact: true,
        strict: true,
        isAuth: true,
        component: Loadable({
            loader: () => import('./home'),
            loading: () => (<Spin size="large"/>)
        })
    }
]

export default routes