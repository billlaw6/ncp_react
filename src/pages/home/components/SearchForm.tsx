import React from 'react';
import { Form, Icon, Input, Button, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import moment, { Moment } from "moment";
import { connect } from "react-redux";

import { getTempReportList } from "_services/report";
import { getTempReportListAction } from "_actions/report";
import { StoreStateI } from "_constants/interface";
import { MapDispatchToPropsI, MapStateToPropsI } from "./type";


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';



interface SearchFormProps extends FormComponentProps {
  dtRange?: [Moment, Moment];
  keyword?: string;
  // handleSubmit: Function;
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalSearchForm extends React.Component<SearchFormProps & MapDispatchToPropsI, any> {
  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e: any) => {
    const { getTempReportList } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // console.log(values.dtRange[0].locale('zh-cn').format(dateFormat));
        // console.log(values.dtRange[1].locale('zh-cn').format(dateFormat));
        let formData: any = {}
        formData['start'] = values.dtRange[0].locale('zh-cn').format(dateFormat);
        formData['end'] = values.dtRange[1].locale('zh-cn').format(dateFormat);
        formData['keyword'] = values.keyword
        getTempReportList(formData);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const dtRangeError = isFieldTouched('dtRange') && getFieldError('dtRange');
    const keywordError = isFieldTouched('keyword') && getFieldError('keyword');
    const todayStart = moment().startOf('day').format(dateFormat);
    const now = moment().locale('zh-cn').format(dateFormat);
    const dateFormatList = [dateFormat, dateFormat];
    console.log(todayStart);
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={dtRangeError ? 'error' : ''} help={dtRangeError || ''}>
          {getFieldDecorator('dtRange', {
            rules: [{ required: true, message: 'Please input your dtRange!' }],
            initialValue: [moment(todayStart, dateFormat), moment(now, dateFormat)],
          })(
            <RangePicker
              showTime={true}
              format={dateFormat}
            />
          )}
        </Form.Item>
        <Form.Item validateStatus={keywordError ? 'error' : ''} help={keywordError || ''}>
          {getFieldDecorator('keyword', {
            rules: [{ required: false, message: 'Please input your keyword!' }],
            initialValue: "",
          })(
            <Input
              prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="keyword"
              placeholder="keyword"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            查询
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedHorizontalSearchForm = Form.create<SearchFormProps>({ name: 'horizontal_search' })(HorizontalSearchForm);

// export default WrappedHorizontalSearchForm;
const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  getTempReportList: getTempReportListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalSearchForm);