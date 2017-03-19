/**
 * @name
 * @description
 * @version 1.0.0
 * @author ericyang
 * @date 2017/3/12
 */
//import './css/init_index.css';
import './sass/index_header.scss'
import React from 'react'
import {render} from 'react-dom'
import dva from 'dva'
import createLoading from 'dva-loading'
import routerConfig from './managerRouter'

const app = dva();

app.use(createLoading());

app.router(routerConfig);

app.start('#all-wrap')
