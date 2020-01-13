import { Row, Col, Select, Table, Input, Popconfirm, Button, Form } from "antd";
import * as React from "react";
const FormItem = Form.Item;
const EditableContext = React.createContext({});

const EditableRow = ({ form, index, ...props }: any) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component<any, any> {
  public state = {
    editing: false,
  };
  public editable: any;
  public input: any;
  public cell: any;
  public form: any;

  public componentDidMount() {
    console.log(this.props.editable);
    if (this.props.editable) {
      document.addEventListener("click", this.handleClickOutside, true);
    }
  }

  public componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener("click", this.handleClickOutside, true);
    }
  }

  public toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  public handleClickOutside = (e: any) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  };

  public save = () => {
    const { record, handleSave }: any = this.props;
    this.form.validateFields((error: any, values: any) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  public render() {
    const { editing } = this.state;
    const { editable, dataIndex, title, record, index, handleSave, ...restProps }: any = this.props;
    console.log(this.props);
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {this.form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(<Input ref={node => (this.input = node)} onPressEnter={this.save} />)}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

export class InputContentConfigurator extends React.Component<any, any> {
  public dataSource: any;
  public columns: any;
  public constructor(props: any) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: 0,
          name: "Edward King 0",
          checkrules: "32",
          defaultValue: "null",
        },
        {
          key: 1,
          name: "Edward King 1",
          checkrules: "32",
          defaultValue: "null",
        },
      ],
      count: 2,
    };

    this.columns = [
      {
        title: "name",
        dataIndex: "name",
        width: "30%",
        editable: true,
      },
      {
        title: "checkrules",
        dataIndex: "checkrules",
        editable: true,
      },
      {
        title: "defaultValue",
        dataIndex: "defaultValue",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text: any, record: any) => {
          return this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null;
        },
      },
    ];
  }

  public handleDelete = (key: any) => {
    console.log(this.props);
    const { dataSource }: any = { ...this.state };
    this.setState({ dataSource: dataSource.filter((item: any) => item.key !== key) });
  };

  public handleAdd = () => {
    const { count, dataSource }: any = { ...this.state };
    const newData = {
      key: count,
      name: count,
      checkrules: "请输入",
      defaultValue: "请输入",
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  public handleSave = (row: any) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item: any) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  public render() {
    const { dataSource }: any = { ...this.state };
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col: any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <h2>Input content configurator</h2>
        <Row>
          <Col span={6}>
            <Form.Item
              label="选择类型："
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
              required={true}
            >
              <Select defaultValue={0}>
                <Select.Option value={0}>List</Select.Option>
                <Select.Option value={1}>String</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="输入对象名字："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              required={true}
            >
              <Input placeholder="请输入对象的名字" />
            </Form.Item>
          </Col>
        </Row>
        <Button onClick={this.handleAdd} type="primary">
          Add a row
        </Button>
        <Table components={components} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
