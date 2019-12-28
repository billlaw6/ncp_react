import React from 'react';
import { Form, Table, Icon, Button, Select, Input, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FormattedMessage } from 'react-intl';
import { Resizable } from 'react-resizable';
// 组件不直接从redux取数据
// import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { IExamIndexList, ISearchForm } from '../../../constants/interface';
import { submitExamIndexSearchAction } from '../../../store/actions/dicom';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker; //获取日期选择控件中的日期范围控件

// 组件不直接从redux取数据
// FORM封装的组件里取不到state和action
// const mapDispatchToProps = {
//     submitExamIndexSearchAction,
// }
// type IDispatchProps = typeof mapDispatchToProps;

// 组件不直接从reducer取数，通过父项传进来。
interface IFormProps extends FormComponentProps {
    // fields: ISearchForm,
    onSubmit(fields: ISearchForm): void,
}

const initialState = {
    dtRange: [moment(new Date()).startOf('day'), moment(new Date()).endOf('day')],
    keyword: '',
    fields: ['patient_name'],
}
type IState = Readonly<typeof initialState>

// class SearchForm extends React.Component<IFormProps, object> {
class SearchForm extends React.Component<IFormProps, IState> {
    // 不需要从props取数初始化state的写法
    readonly state: IState = initialState;
    // 需要从props取数初始化state的写法
    // constructor(props: IFormProps) {
    //     super(props);
    //     this.state = {
    //         dtRange: [moment(new Date()).startOf('day'), moment(new Date()).endOf('day')],
    //         keyword: '',
    //         fields: ['patient_name'],
    //     }
    // }
    componentDidMount() {
        console.log(this.state);
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
    name: 'dicom_search_form',
})(SearchForm);


export default WrappedSearchForm;