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
		this.fetch = this.fetch.bind(this);
	}
	fetch() {
		dataComm.getAllUserData(function(res){
			let data = res.data.map((item , index) => {
				return {
					key : index,
					userName : item.username,
					blogNumber : item.blogNumber,
					fansNumber : item.isAttention.length,
					attentionNumber : item.attention.length
				}
			})
			this.setState({
				data
			})
		}.bind(this));
	}
	componentDidMount(){
		this.fetch();
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
