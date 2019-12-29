import React from 'react';
import { Form, Table, Icon, Button, Select, Input, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FormattedMessage } from 'react-intl';
import { Resizable } from 'react-resizable';
// 组件不直接从redux取数据
// import { connect } from 'react-redux';
import moment from 'moment';
import { ISearchForm } from '../../../constants/interface';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker; //获取日期选择控件中的日期范围控件

// 组件不直接从reducer取数，通过父项传进来。
interface IFormProps extends FormComponentProps {
    fields: any,
    onSubmit(fields: ISearchForm): void,
}

class SearchForm extends React.Component<IFormProps, any> {
    // 不需要从props取数初始化state的写法
    componentDidMount() {
        console.log(this.props);
    }
    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.form.validateFields(
            (err, fieldsValues) => {
                if (err) {
                    return;
                }
                // Should format date value before submit.
                console.log(fieldsValues);
                const values = {
                    ...fieldsValues,
                };
                // 此处的props里没有action
                // console.log(this.props);
                this.props.onSubmit(values);
            });
    }
    render() {
        const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched } = this.props.form;
        const dtRangeError = isFieldTouched('dtRange') && getFieldError('dtRange');
        const keywordError = isFieldTouched('keyword') && getFieldError('keyword');
        const dtRangeValidator = (rule: any, value: any, callback: any) => {
            // console.log(rule);
            // console.log(value);
            try {
                // throw new Error('Error Message!');
                if (value.length === 2) {
                    callback();
                } else {
                    throw new Error('length error!');
                }
            } catch (err) {
                callback(err);
            }
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" className="dicom-search-form">
                    <Form.Item
                        validateStatus={dtRangeError ? 'error' : ''}
                        help={dtRangeError || ''}
                        label={<FormattedMessage id="welcome" />}
                    >
                        {/* getFieldDecorator(id, options) */}
                        {getFieldDecorator('dtRange', {
                            rules: [
                                {
                                    type: 'array',
                                    len: 2,
                                    required: true,
                                    validator: dtRangeValidator,
                                    message: '请选择检查时间范围',
                                },
                            ],
                            validateTrigger: 'onChange',
                            // 优先级不如mapPropsToFields中的value高
                            initialValue: [
                                moment('2019-12-12').startOf('day'),
                                moment('2019-12-25').endOf('day'),
                            ],
                        })(
                            <RangePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={keywordError ? 'error' : ''} help={keywordError || ''}>
                        {getFieldDecorator('keyword', {
                            rules: [
                                {
                                    required: false,
                                    max: 64,
                                    type: 'string',
                                    whitespace: false,
                                    message: '请输入检索关键词',
                                },
                            ],
                            // 优先级不如mapPropsToFields中的value高
                            initialValue: 'keyword',
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                type="text"
                                placeholder="keyword"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">
                            检索
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export const WrappedSearchForm = Form.create<IFormProps>({
    name: 'exam_search_form',
    // 当 Form.Item 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 Redux store
    onFieldsChange(props, changedFields) {
        // props.onChange(changedFields);
    },
    // 任一表单域的值发生改变时的回调
    onValuesChange(_, values) {
        console.log(values);
    },
    mapPropsToFields(props) {
        console.log(props.fields);
        return {
            dtRange: Form.createFormField({
                ...props.fields.dtRange,
                value: props.fields.dtRange.value,
            }),
            // 优先级比initialValue高
            keyword: Form.createFormField({
                ...props.fields.keyword,
                value: props.fields.keyword.value,
            }),
        };
    },
})(SearchForm);


export default WrappedSearchForm;