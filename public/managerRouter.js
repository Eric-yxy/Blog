import {Router , Route} from 'dva/router'

const cached = {};
let registerModel = (app , model)=>{
    if (!cached[model.namespace]) {
        app.model(model)
        cached[model.namespace] = 1
    } 
}

let routerConfig = ({history , app}) =>{
    const routes = [
        {
            path : '/',
            getComponent(nextState , cb){
                require.ensure([] , require =>{
                    cb(null , require('./managerComponents/App').default);
                } , 'app');
            },
            indexRoute : {
                getComponent(nextState , cb){
                    require.ensure([] , require => {
                        cb(null , require('./managerComponents/index').default);
                    } , 'index')
                }
            },
            childRoutes : [
                {
                    path : 'user',
                    getComponent(nextState , cb){
                        require.ensure([] , require => {
                            cb(null , require('./managerComponents/user').default)
                        } , 'userDetail')
                    },
                    indexRoute : {
                        getComponent(nextState , cb){
                            require.ensure([] , require => {
                                cb(null , require('./managerComponents/user/userDetail').default)
                            } , 'user')
                        }
                    },
                    childRoutes : [
                        {
                            path : 'userDetail',
                            getComponent(nextState , cb){
                            require.ensure([] , require => {
                                cb(null , require('./managerComponents/user/userDetail').default)
                                } , 'userDetail')
                            }
                        }
                    ]
                   
                },
                {
                    path : 'blog',
                    getComponent(nextState , cb){
                        require.ensure([] , require => {
                            cb(null , require('./managerComponents/blog').default)
                        } , 'blog')
                    },
                    indexRoute : {
                        getComponent(nextState , cb){
                            require.ensure([] , require => {
                                cb(null , require('./managerComponents/blog/blogList').default)
                            } , 'blogList')
                        }
                    }
                },
                {
                    path : 'tool',
                    getComponent(nextState , cb){
                        require.ensure([] , require => {
                            cb(null , require('./managerComponents/tool').default)
                        } , 'toolIndex')
                    },
                    indexRoute : {
                        getComponent(nextState , cb){
                            require.ensure([] , require => {
                                cb(null , require('./managerComponents/tool/createPush').default)
                            } , 'createPush')
                        }
                    },
                    childRoutes : [
                        {
                            path : 'createPush',
                            getComponent(nextState , cb){
                            require.ensure([] , require => {
                                cb(null , require('./managerComponents/tool/createPush').default)
                                } , 'createPush')
                            }
                        },
                        
                    ]
                } 

            ]
        }
    ]

    return(
        <Router history = {history} routes = {routes}></Router>
    )
}

export default routerConfig;