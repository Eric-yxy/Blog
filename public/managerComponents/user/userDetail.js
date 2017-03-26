import React , {Component} from 'react'
import {Table} from 'antd'

class UserIndex extends Component{
	constructor(props){
		super(props);
		this.state = {
			columns : [
				{
					title : '用户名', 
					dataIndex : 'userName',
				},
				{
					title : '微博数量',
					dataIndex : 'blogNumber'
				},
				{
					title : '粉丝数',
					dataIndex : 'fansNumber'
				},
				{
					title : '关注数',
					dataIndex : 'attentionNumber'
				},
				{
					title : '操作',
					dataIndex : 'action',
					render : value => <a>编辑该用户</a>
				},
			],
			data : [],
			loading : false
		}
	}
    render() {
        return(
            <div>
				<Table
					columns = {this.state.columns}
					dataSource = {this.state.data}
					loading = {this.state.loading}
				></Table>
            </div>
        )
    }
}

export default UserIndex;