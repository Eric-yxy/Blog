import React , {Component} from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'
// import '../test.css' 
// import Button from 'antd/lib/button';
// import 'antd/lib/button/style'; 
import {Menu , Button , Table , Row , Col} from 'antd'
import './app.scss'

const MenuItem = Menu.Item;


class App extends Component{
    render() {
        return(
            <Row>
				<Col span = {24}>
	    			<Menu
					 mode="horizontal"
					 style = {{paddingLeft : 40 }}
	    			>
						<MenuItem>
							<Link to="/">首页</Link>
						</MenuItem>

						<MenuItem>
							<Link to='/user'>用户管理</Link>
						</MenuItem>

						<MenuItem>
							<Link to='/blog'>微博管理</Link>
						</MenuItem>
	    			</Menu>
				</Col>
				<Col className = 'all-content-wrap' span={22} offset={1}>
					{this.props.children}
				</Col>
            </Row>
        )
    } 
}
let select = (state) => {
    return{}
}

export default connect(select)(App);