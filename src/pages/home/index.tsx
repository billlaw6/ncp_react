/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement, Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Dropdown, Menu, Icon, Pagination, Table, Checkbox, Modal } from "antd";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment, { Moment } from "moment";
import { StoreStateI, DailyReportI } from "_constants/interface";

import {
  MapStateToPropsI,
  HomePropsI,
  HomeStateI,
  MapDispatchToPropsI,
} from "./type";
import {
  setDailyReportSearchAction,
  getDailyReportListAction,
  checkDailyReportListAction,
  setDailyReportListAction,
} from "_actions/report";
import { Redirect } from "react-router";

import { Gutter } from "antd/lib/grid/row";
import { PaginationConfig, ColumnProps, TableEventListeners } from "antd/lib/table";
import LinkButton from "_components/LinkButton/LinkButton";
import SearchForm from "./components/SearchForm";
import { date2LocalString } from "../../utils/utils";
import axios from "axios";

import "./Home.less";

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

class Home extends Component<HomePropsI, HomeStateI> {
  constructor(props: HomePropsI) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      redirectReport: false,
      feverCount: 0,
      cadreCount: 0,
      foreignCount: 0,
      isDeptReporter: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this); //
  }
  // 传给检索表单
  handleFieldsChange = (changedValues: any) => {
    // console.log(changedValues);
    // 此时收到的还是Moment类型
    if (changedValues.hasOwnProperty("dtRange")) {
      const start = changedValues.dtRange.value[0].locale('zh-cn').format(dateFormat);
      const end = changedValues.dtRange.value[1].locale('zh-cn').format(dateFormat);
      const keyword = this.props.dailyReportSearchForm.keyword;
      this.props.setDailyReportSearchAction({ start: start, end: end, keyword: keyword });
    }
    if (changedValues.hasOwnProperty("keyword")) {
      const start = this.props.dailyReportSearchForm.start;
      const end = this.props.dailyReportSearchForm.end;
      const keyword = changedValues.keyword.value;
      this.props.setDailyReportSearchAction({ start: start, end: end, keyword: keyword });
    }
  };

  // 传给检索表单
  handleSubmit = (submitedData: any) => {
    console.log(submitedData);
    console.log(this.props.dailyReportSearchForm);
    this.props.getDailyReportListAction(this.props.dailyReportSearchForm);
  };

  componentDidMount(): void {
    const {
      user,
      dailyReportList,
      getDailyReportListAction,
    } = this.props;
    if (1 in user.groups) {
      this.setState({ isDeptReporter: true })
    }
    const { feverCount, cadreCount, foreignCount } = this.state;
    console.log(this.props.dailyReportSearchForm);
    getDailyReportListAction(this.props.dailyReportSearchForm);
    dailyReportList.forEach(item => {
      if (item.is_fever) {
        const newFeverCount = feverCount + 1;
        this.setState({ feverCount: newFeverCount });
      }
      if (item.duty == "干部") {
        const newForeignCount = foreignCount + 1;
        this.setState({ foreignCount: newForeignCount });
      }
      if (item.foreign_flag) {
        const newForeignCount = foreignCount + 1;
        this.setState({ foreignCount: newForeignCount });
      }
    });
  }

  showConfirm = (): void => {
    Modal.confirm({
      centered: true,
      className: "del-confirm",
      title: "确认审核",
      content: "确认审核所选体温报告吗？",
      cancelText: "取消",
      okText: "确定",
      onOk: async (): Promise<void> => {
        const { selectedRowKeys } = this.state;
        const { checkDailyReportListAction } = this.props;
        // console.log("check selected reports: ", selectedRowKeys);
        checkDailyReportListAction(selectedRowKeys);
        this.setState({
          selectedRowKeys: [],
        });
      },
      onCancel: (): void => {
        this.setState({
          selectedRowKeys: [],
        });
      },
    });
  };

  onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  handleDownloadClick = () => {
    console.log('donwload clicked');
    // const { start, end, keyword } = this.state;
    // const downloadUrl = "http://localhost:8083/rest-api/report/daily/download/";
    const downloadUrl = "http://123.56.115.20:8083/rest-api/report/daily/download/";
    // const downloadUrl = "http://report.carryon.top/rest-api/report/daily/download/";
    axios({
      method: 'get',
      url: downloadUrl,
      params: this.props.dailyReportSearchForm,
      headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: 'blob',
    }).then((res: any) => {
      // let blob = new Blob([res]);
      let blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      let a = document.createElement("a");
      let objectUrl = URL.createObjectURL(blob);  // 创建下载链接
      a.href = objectUrl;
      document.body.appendChild(a);
      a.click(); // 点击下载
      // a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      document.body.removeChild(a);
      window.URL.revokeObjectURL(objectUrl);  // 释放掉blob对象
    })
  }

  render(): ReactElement {
    const { user, dailyReportList } = this.props;
    const { loading, isDeptReporter, feverCount, cadreCount, foreignCount, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0;
    const columns: any = [
      {
        title: "科室",
        dataIndex: "department",
        key: "department",
        // 中文排序方法
        sorter: (a: any, b: any) => a.localeCompare(b.department, 'zh-CN'),
      },
      {
        title: "员工编码",
        dataIndex: "emp_code",
        key: "emp_code",
        filters: [
          {
            text: "在职职工",
            value: 0,
          },
          {
            text: "外包公司",
            value: 1,
          },
          {
            text: "医辅人员",
            value: 2,
          },
          {
            text: "学生",
            value: 3,
          },
        ],
        onFilter: (value: number, record: any) => record.emp_code == value,
        render: (value: string) => {
          const roleObject: any = {
            '0': '在职职工',
            '1': '外包公司',
            '2': '医辅人员',
            '3': '学生',
          }
          return <span>{value}</span>
        }
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: 'name',
        render: (text: string, record: any): ReactElement | string => {
          const { id } = record;
          return (
            <span>
              <span>{text}</span>;
            </span>
          )
        },
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        filters: [
          {
            text: "保密",
            value: 0,
          },
          {
            text: "男",
            value: 1,
          },
          {
            text: "女",
            value: 2,
          },
        ],
        onFilter: (value: number, record: any) => record.gender == value,
        render: (value: number) => {
          const genderObject: any = {
            '0': '保密',
            '1': '男',
            '2': '女',
          }
          return <span> {genderObject[value]}</span>;
        },
      },
      {
        // title: "医院中层及以上干部标识",
        title: "干部标识",
        dataIndex: "duty",
        key: "duty",
        filters: [
          {
            text: "是",
            value: 0,
          },
          {
            text: "否",
            value: 1,
          },
        ],
        onFilter: (value: number, record: any) => record.duty == value,
        render: (value: number) => {
          const genderObject: any = {
            '0': '是',
            '1': '否',
          }
          return <span> {genderObject[value]}</span>;
        },
      },
      {
        title: "填报日期",
        dataIndex: "created_at",
        key: "created_at",
        render: (value: string) => {
          // console.log(new Date(value));
          const dt = new Date(value);
          // console.log(dt.valueOf());
          return (
            <span> {date2LocalString(dt, "yyyy-MM-dd hh:mm:ss")} </span>
          );
        },
        sorter: (a: any, b: any) => {
          // console.log(a);
          const a1 = new Date(a.created_at).valueOf();
          const b1 = new Date(b.created_at).valueOf();
          return a1 - b1;
        }
      },
      {
        title: "人员状态",
        dataIndex: "work_status_name",
        key: "work_status_name",
        filters: [
          {
            text: "",
            value: 1,
          },
        ],
        onFilter: (value: number, record: any) => record.work_status == value,
      },
      {
        title: "现工作科室",
        dataIndex: "work_department",
        key: "work_department",
        render: (text: string, record: any): ReactElement | string => {
          const { id } = record;
          console.log(record);
          return (
              <span>{text}</span>
          )
        },
      },
      {
        title: "体温是否高于37.2",
        dataIndex: "is_fever",
        key: "is_fever",
        filters: [
          {
            text: "否",
            value: 0,
          },
          {
            text: "是",
            value: 1,
          },
        ],
        onFilter: (value: number, record: any) => record.is_fever == value,
        render: (value: number) => {
          const color = value ? "red" : "green";
          const genderObject: any = {
            '0': '否',
            '1': '是',
          }
          return <span style={{ color: color }}> {genderObject[value]}</span>;
        },
      },
      {
        title: "具体体温",
        dataIndex: "temperature",
        key: "temperature",
        render: (value: number) => {
          const color = value >= 37.2 ? "red" : "green";
          const dailyerature = value >= 37.2 ? value : "";
          return <span style={{ color: color }}>{dailyerature}</span>;;
        },
        sorter: (a: any, b: any) => a.dailyerature - b.dailyerature,
      },
      {
        title: "备注",
        dataIndex: "comments",
        key: "comments",
      },
      {
        title: "是否已审",
        dataIndex: "check_flag",
        key: "check_flag",
        filters: [
          {
            text: "未审核",
            value: 0,
          },
          {
            text: "已审核",
            value: 1,
          },
        ],
        onFilter: (value: number, record: any) => record.check_flag == value,
        render: (value: number) => {
          const color = value ? "green" : "red";
          const status = value ? "已审" : "未审";
          return <span style={{ color: color }}> {status}</span >
        },
      },
    ];

    return (
      <div className="daily-reports">
        <div className="daily-reports-header">我的上报卡</div>
        <Row type="flex" justify="start">
          <Col span={16}>
            <SearchForm handleFieldsChange={this.handleFieldsChange} handleSubmit={this.handleSubmit}></SearchForm>
          </Col>
          <Col span={8}>
            <section className="daily-reports-summary">共检索到{dailyReportList.length}份体温报告，{feverCount}份发热，{cadreCount}份干部报告</section>,
          </Col>
        </Row>

        <div
          className="daily-report-div">
          <Row type="flex" justify="start" className="daily-reports-link">
            <Col span={12}>
              <h3>每日体温上报</h3>
            </Col>
            <Col offset={6} span={6}>
              <a href="/daily-report">新建上报</a>
            </Col>
          </Row>
          <Table
            ref="daily-reports-table"
            rowSelection={rowSelection}
            className="daily-report-list daily-report-list-table"
            rowKey={record => record.id}
            columns={columns}
            dataSource={dailyReportList}
            onRow={(record): TableEventListeners => {
              return {
                onClick: (): void => {
                  // this.onClickItem(record.id);
                },
              };
            }}
          ></Table>

          <Row>
            <Col>
              <Button
                style={{
                  margin: "15px",
                  float: "right",
                  display: isDeptReporter ? "block" : "none"
                }}
                disabled={hasSelected ? false : true}
                onClick={this.showConfirm}
              >
                审核提交所选报告
            </Button>
            </Col>
            <Col>
              <Button
                style={{
                  margin: "15px",
                  float: "right",
                }}
                onClick={this.handleDownloadClick}
              >
                下载报告到Excel文件
            </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  token: state.token,
  dailyReportList: state.dailyReportList,
  dailyReportSearchForm: state.dailyReportSearchForm,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  setDailyReportSearchAction: setDailyReportSearchAction,
  getDailyReportListAction: getDailyReportListAction,
  checkDailyReportListAction: checkDailyReportListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
