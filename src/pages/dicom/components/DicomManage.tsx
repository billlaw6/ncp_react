import React from 'react';
import { Form, Table, Icon, Button, Select, Input, DatePicker } from 'antd';
import { IDicomInfo, IDicomSearchState } from '../../../constants/store.d';
import { FormComponentProps } from 'antd/es/form';
import { FormattedMessage } from 'react-intl';
// 组件不直接从redux取数据
// import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/zh-cn';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker; //获取日期选择控件中的日期范围控件

// 组件不直接从reducer取数，通过父项传进来。
interface IProps extends FormComponentProps {
    fields: IDicomSearchState,
    onChange(fields: IDicomSearchState): void,
    onSubmit(fields: IDicomSearchState): void,
}

class DicomManage extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        console.log(props);
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
        this.props.onSubmit(this.props.fields);
    }
    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValues) => {
            if (err) {
                return;
            }
            // Should format date value before submit.
            console.log(fieldsValues);
            const dtRangeValue = fieldsValues['dtRange'];
            const values = {
                ...fieldsValues,
                'dtRange': [
                    dtRangeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    dtRangeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                ],
            };
            console.log('Received values of form: ', values);
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
                                    message: 'Please input your Password!',
                                },
                            ],
                        })(
                            <RangePicker
                                showTime format="YYYY-MM-DD HH:mm:ss"
                            />
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={keywordError ? 'error' : ''} help={keywordError || ''}>
                        {getFieldDecorator('keyword', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!',
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
                            Log in
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export const DicomInfoSearchForm = Form.create<IProps>({
    name: 'dicom_search_form',
    mapPropsToFields(props: any) {
        console.log(props);
        return {
            dtRange: Form.createFormField({
                ...props.fields.dtRange,
                value: [moment(props.fields.dtRange[0]).startOf('day'), moment(props.fields.dtRange[1]).endOf('day')],
            }),
            keyword: Form.createFormField({
                ...props.fields.keyword,
                value: props.fields.keyword,
            }),
        };
    },
    onValuesChange(props, changedValues, allValues) {
        console.log(props);
        props.onChange(changedValues);
    }
})(DicomManage);

export class DicomInfoTable extends Table<IDicomInfo> {}

// export default { DicomInfoSearchForm, DicomInfoTable };