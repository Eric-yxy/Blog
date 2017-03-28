import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio, Upload, message , notification} from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

class CreatePush extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowUserDefinedUrl: false,
      file: null,
      clientList: [],
      loading: false
    }

  }

  handleSubmit(){

  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <h1>创建推送</h1>

        <Row>
          <Col span={12} offset={4}>
            <Form horizontal onSubmit={e => this.handleSubmit(e)}>
              <FormItem label='通知标题'>
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入通知标题！' }]
                })(
                  <Input placeholder='请输入通知标题' />
                )}
              </FormItem>
              <FormItem label='通知内容'>
                {getFieldDecorator('pushContent', {
                  rules: [{ required: true, message: '请输入通知内容!' }]
                })(
                  <Input placeholder='请输入通知内容' type='textarea'  />
            )}
              </FormItem>
             
              <FormItem label='推送平台'>
                {
              getFieldDecorator('platform', {initialValue: 'ANDROID'})
              (<RadioGroup>
                <RadioButton value='ANDROID'>android</RadioButton>
                <RadioButton value='IOS'>ios</RadioButton>
              </RadioGroup>)
            }
              </FormItem>
              {/*<FormItem label='推送方式'>
                {
                  getFieldDecorator('pushType', {initialValue: 'all'})
                  (<RadioGroup onChange={this.toggleFileBtn}>
                    <RadioButton value='all'>全量推送</RadioButton>
                    <RadioButton value='part'>局部推送</RadioButton>
                  </RadioGroup>)
                }
              </FormItem>*/}
             
              <FormItem>
                <Button type='primary' loading = {this.state.loading} htmlType='submit'>提交</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

function select(state) {
  return {}
}

module.exports = connect(select)(Form.create()(CreatePush))

