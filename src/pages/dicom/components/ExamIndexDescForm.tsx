import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { IExamIndexForm } from '../../../constants/interface';

interface IExamIndexDescFormProps extends FormComponentProps {
    fields: any,
    onChange(fields: IExamIndexForm): void,
    onSubmit(fields: IExamIndexForm): void,
}

class ExamIndexDescForm extends React.Component<IExamIndexDescFormProps, any> {
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields(
            // { force: true },    // 让已经校验通过的表单域在触发条件满足时再次检验。
            (err, values) => {
                if (!err) {
                    // console.log(values);
                    this.props.onSubmit(values);
                }
            }
        )
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('id', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your id!',
                            },
                        ],
                        validateTrigger: 'onChange',
                    })(
                        <Input style={{display: "None"}} placeholder="id"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('desc', {
                        rules: [
                            {
                                required: false,
                                message: '',
                            },
                        ],
                        validateTrigger: 'onChange',
                    })(
                        <Input type="desc" placeholder="备注"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                        <Icon type="form"></Icon>
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

// 此处的<IProps>可加可不加
// const WrappedExamIndexDescForm = Form.create<IProps>()( ExamIndexDescForm,);
const WrappedExamIndexDescForm = Form.create<IExamIndexDescFormProps>({
    name: 'exam_index_desc_form',
    mapPropsToFields(props: IExamIndexDescFormProps) {
        console.log(props.fields);
        return {
            id: Form.createFormField({
                ...props.fields,
                value: props.fields.id.value,
            }),
            desc: Form.createFormField({
                ...props.fields,
                value: props.fields.desc.value,
            }),
        };
    },
    // onFieldsChange(props: IExamIndexDescFormProps, changedFields: any, allFields: IExamIndexForm) {
    //     console.log(changedFields);
    // },
    onValuesChange(props, changedValues, allValues) {
        // console.log(allValues);
        props.onChange(changedValues);
    },
})(ExamIndexDescForm);

export default WrappedExamIndexDescForm;
