import React from "react";
import { Table, Icon, Button, Input } from "antd";
import { ExamIndexListI, ExamIndexFormI } from "../../../constants/interface";
import { FormattedMessage } from "react-intl";
import { Resizable } from "react-resizable";
import ExamIndexDescForm from "./ExamIndexDescForm";

// 组件不直接从reducer取数，通过父项传进来。
type IProps = {
  examIndexData: ExamIndexListI[];
};

// 写object会取不到state的值
// class ExamIndexTable extends React.Component<IProps, object> {
class ExamIndexTable extends React.Component<IProps, any> {
  // state不从props取值就独立写constructor外，加上readonly
  readonly state = {
    showModal: false,
    examIndexColumns: [
      {
        title: "类型",
        dataIndex: "modality",
        key: "modality",
      },
      {
        title: "姓名",
        dataIndex: "patient_name",
        key: "patient_name",
      },
      {
        title: "上传日期",
        dataIndex: "created_at",
        key: "created_at",
        render: (value: any, record: ExamIndexListI, index: number) => {
          return value;
        },
      },
      {
        title: "备注",
        dataIndex: "desc",
        key: "desc",
        // fixed属性和render貌似不能共存
        render: (value: any, record: ExamIndexListI, index: number) => {
          const fields = {
            id: {
              value: record.id,
            },
            desc: {
              value: value,
            },
          };
          const handleFormChange = (changedData: ExamIndexFormI) => {
            console.log(changedData);
          };
          const handleFormSubmit = (submitedData: ExamIndexFormI) => {
            console.log(submitedData);
          };
          return (
            <div>
              <ExamIndexDescForm
                fields={fields}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
              ></ExamIndexDescForm>
            </div>
          );
        },
      },
    ],
  };
  componentDidMount() {
    // To disabled submit button at the beginning.
    // console.log(this.props);
  }
  render() {
    const { examIndexData } = this.props;
    const { examIndexColumns } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
      },
      getCheckboxProps: (record: any) => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div>
        <span>影像列表</span>
        <Button type="primary">
          <Icon type="cloud-upload" theme="outlined"></Icon>上传
        </Button>
        <Button type="primary">
          <Icon type="delete" theme="outlined"></Icon>
          <span>全选</span>
          <span>删除</span>
        </Button>
        <Icon type="ordered-list" theme="outlined"></Icon>
        <Icon type="unordered-list" theme="outlined"></Icon>
        <Table
          rowSelection={rowSelection}
          columns={examIndexColumns}
          rowKey={item => item.id}
          dataSource={examIndexData}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 240 }}
        ></Table>
      </div>
    );
  }
}

export default ExamIndexTable;
