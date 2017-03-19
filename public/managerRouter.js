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
            getIndexRoute(nextState , cb){
                require.ensure([] , require =>{
                    cb(null , require('./managerComponents/App'));
                } , 'mainPage');
            },
            childRoutes : [
                {
                    path : '/user',
                    getComponent(nextState , cb){
                        require.ensure([] , require => {
                            cb(null , require('./managerComponents/user'))
                        })
                    }
                }
            ]
        }
    ]

    return(
        <Router history = {history} routes = {routes}></Router>
    )
}

export default routerConfig;