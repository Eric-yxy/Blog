import React , {Component} from 'react'
import {Table , Form , Input , Row , Col , Button} from 'antd'

const FormItem = Form.Item;

class UserIndex extends Component{
	constructor(props){
		super(props);
		this.state = {
			columns : [
				{
					title : '作者',
					dataIndex : 'author',
				},
				{
					title : '作者id',
					dataIndex : 'authorId'
				},
				{
					title : '收藏数',
					dataIndex : 'collectionNumber'
				},
				{
					title : '评论数',
					dataIndex : 'commentNumber'
				},
				{
					title : '微博内容',
					dataIndex : 'content'
				},
				{
					title : '日期',
					dataIndex : 'date'
				},
				{
					title : '操作',
					dataIndex : 'action',
					render : value => <a>删除</a>
				},
			],
			data : [],
			loading : false
		}
		this.fetch = this.fetch.bind(this);
	}

	fetch() {
		dataComm.getBlogList('all' , '' , 0  , 0 , function(res){
			let data = res.data.map((item , index) => {
				return {
					key : index,
					author : item.author,
					authorId : item._id,
					collectionNumber : item.collectionNumber,
					commentNumber : item.commentNumber,
					content : item.contentText,
					date : item.date,
					likes : item.likes
				}
			});
			this.setState({
				data
			})
		}.bind(this))
	}

	componentDidMount() {
		this.fetch();
	}
    render() {
    	const {getFieldDecorator} = this.props.form
        // return(
        //     <div>
				// <Form>
		    //       <FormItem
		    //         label=''
		    //                   >
		    //         {getFieldDecorator('cellphones')(
		    //           <Input type='textarea' style={{height : 100}} placeholder='请输入用户名或者博客内容' />
		    //                   )}
		    //       </FormItem>
		    //       <FormItem
		    //       >
		    //         <Row>
		    //           <Col span={22} offset={2}>
		    //             <Button type='primary' htmlType='submit' size='large'>搜索博客</Button>
		    //           </Col>
		    //         </Row>
		    //       </FormItem>
		    //     </Form>
        //     </div>
        // )
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

export default Form.create()(UserIndex);
