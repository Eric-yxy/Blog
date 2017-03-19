import React , {Component} from 'react'
import {connect} from 'dva'

class App extends Component{
    render() {
        return(
            <div>app</div>
        )
    }
}
let select = (state) => {
    return{}
}

export default connect(select)(App);