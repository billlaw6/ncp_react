import React from 'react';
import { Form, Table, Icon, Button, Select, Input, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FormattedMessage } from 'react-intl';
import { Resizable } from 'react-resizable';
// 组件不直接从redux取数据
// import { connect } from 'react-redux';
import { ISearchForm } from '../../../constants/interface';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker; //获取日期选择控件中的日期范围控件

// 组件不直接从reducer取数，通过父项传进来。
interface IFormProps extends FormComponentProps {
    fields: ISearchForm,
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
        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout="inline" className="dicom-search-form">
                    <Form.Item
                        validateStatus={dtRangeError ? 'error' : ''}
                        help={dtRangeError || ''}
                        label={<FormattedMessage id="welcome" />}
                    >
                        {getFieldDecorator('dtRange', {
                            rules: [
                                {
                                    type: 'array',
                                    required: true,
                                    message: '请选择检查时间范围',
                                },
                            ],
                            validateTrigger: 'onChange',
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
                                    required: true,
                                    message: '请输入检索关键词',
                                },
                            ],
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
    onFieldsChange(props, changedFields) {
        // props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        console.log(props.fields);
        return {
            // dtRange: Form.createFormField({
            //     ...props.fields.dtRange,
            //     value: props.fields.dtRange,
            // }),
            // keyword: Form.createFormField({
            //     ...props.fields.keyword,
            //     value: props.fields.keyword,
            // }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})(SearchForm);


export default WrappedSearchForm;