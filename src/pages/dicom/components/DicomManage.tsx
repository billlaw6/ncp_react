import React from 'react';
import { Form, Icon, Table, Button, Select, Input, DatePicker, TimePicker } from 'antd';
import { IDicomInfo, IDicomSearchState, IStoreState } from '../../../constants/store.d';
import { 
    dicomSearchRequstedAction,
    dicomSearchSucceededAction
} from '../../../actions/dicom';
import { FormComponentProps } from 'antd/es/form';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { array } from 'prop-types';

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
    }
    // handleSubmit = (e: any) => {
    //     e.preventDefault();

    //     this.props.form.validateFields((err, fieldsValues) => {
    //         if (err) {
    //             return;
    //         }
    //         // Should format date value before submit.
    //         console.log(fieldsValues);
    //         const dtRangeValue = fieldsValues['dtRange'];
    //         const values = {
    //             ...fieldsValues,
    //             'dtRange': [
    //                 dtRangeValue[0].format('YYYY-MM-DD HH:mm:ss'),
    //                 dtRangeValue[1].format('YYYY-MM-DD HH:mm:ss'),
    //             ],
    //         };
    //         console.log('Received values of form: ', values);
    //     });
    // }
    render() {
        const columns = [
            {
                title: '联系人',
                dataIndex: 'userName',
                key: 'userName',
            },
        ];

        const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched } = this.props.form;
        const dtRangeError = isFieldTouched('dtRange') && getFieldError('dtRange');
        const keywordError = isFieldTouched('keyword') && getFieldError('keyword');
        return (
            <div>
                <Form layout="inline" className="dicom-search-form">
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

const WrappedDicomManage = Form.create<IProps>({
    name: 'dicom_search_form',
    mapPropsToFields(props: any) {
        console.log(props);
        return {
            dtRange: Form.createFormField({
                ...props.fields.dtRange,
                value: [moment(props.fields.dtRange[0]), moment(props.fields.dtRange[1])],
            }),
            keyword: Form.createFormField({
                ...props.fields.keyword,
                value: props.fields.keyword,
            }),
        };
    },
    onValuesChange(props, fieldsValues) {
        console.log(props);
        props.onChange(fieldsValues);
    }
})(DicomManage);

export default (WrappedDicomManage);