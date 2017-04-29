import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'dva/router'
import {Form, Input, Button, Menu} from 'antd'
import '../app.scss'

const FormItem = Form.Item

class BlogIndex extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectKey: ['1']
    }
  }

  // syncSelectKey() {
  //   const pathname = this.props.routing.locationBeforeTransitions.pathname
  //   switch (pathname) {
  //     case '/user':
  //       this.setState({selectKey: ['1']})
  //       break
  //     case '/user/userDetail':
  //       this.setState({selectKey: ['1']})
  //       break
  //   }
  // }

  // componentWillReceiveProps() {
  //   this.syncSelectKey()
  // }

  // componentDidMount() {
  //   this.syncSelectKey()
  // }

  render() {
    // const {getFieldDecorator} = this.props.form
    return (
      <div>
        <aside className='content-layerout-sider'>
          <Menu mode='inline' defaultSelectedKeys={['1']} selectedKeys={this.state.selectKey}>
            <Menu.Item key='1'><Link to='/blog/blogList'>微博列表</Link></Menu.Item>

          </Menu>

        </aside>

        <div className='content-layerout-main'>
          <div style={{ height: 720 }}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
// let select = (state) => {
//   return {
//     routing: state.routing
//   }
// }

// export default connect(select)(Form.create()(Index))
export default BlogIndex;
