import React , {Component} from 'react'
import {Table , Form , Input , Row , Col , Button} from 'antd'

const FormItem = Form.Item;

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
    	const {getFieldDecorator} = this.props.form
        return(
            <div>
				<Form>
		          <FormItem
		            label=''
		                      >
		            {getFieldDecorator('cellphones')(
		              <Input type='textarea' style={{height : 100}} placeholder='请输入用户名或者博客内容' />
		                      )}
		          </FormItem>
		          <FormItem
		          >
		            <Row>
		              <Col span={22} offset={2}>
		                <Button type='primary' htmlType='submit' size='large'>搜索博客</Button>
		              </Col>
		            </Row>
		          </FormItem>
		        </Form>
            </div>
        )
    }
}

export default Form.create()(UserIndex);