/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement, Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Dropdown, Menu, Icon, Pagination, Table, Checkbox, Modal } from "antd";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment, {Moment} from "moment";
import { StoreStateI, TempReportI } from "_constants/interface";

import {
  MapStateToPropsI,
  HomePropsI,
  HomeStateI,
  MapDispatchToPropsI,
  TableDataI,
} from "./type";
import {
  getTempReportListAction,
  checkTempReportListAction,
  getCadreReportListAction,
  checkCadreReportListAction,
} from "_actions/report";
import { Redirect } from "react-router";

import { Gutter } from "antd/lib/grid/row";
import { PaginationConfig, ColumnProps, TableEventListeners } from "antd/lib/table";
import LinkButton from "_components/LinkButton/LinkButton";
// import Notice from "./components/Notice";
import SearchForm from "./components/SearchForm";
import { date2LocalString } from "../../utils/utils";
import { getTempReportList, downloadTempReportList } from "_services/report";
// import { axios as MyAxios } from "_services/api";
import axios from "axios";

import "./Home.less";
import { userInfo } from "os";

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const DEFAULT_PAGE_SIZE = 12;

class Home extends Component<HomePropsI, HomeStateI> {
  constructor(props: HomePropsI) {
    super(props);

    this.state = {
      selectedRowKeys: [],
      selectedRowKeysCadre: [],
      loading: false,
      redirectReport: false,
      start: "",
      end: "",
      keyword: "",
      page: 1,
      feverCount: 0,
      foreignCount: 0,
    };
  }
  // 传给检索表单
  handleFieldsChange = (changedValues: any) => {
    // const { start, end, keyword } = this.state;
    // for (const key of Object.keys(changedValues)) {
    //   if (key === "dtRange") {
    //     this.setState({'start': changedValues["dtRange"].value[0].locale("zh-cn").format(dateFormat)});
    //     this.setState({'end': changedValues["dtRange"].value[1].locale("zh-cn").format(dateFormat)});
    //   }
    //   if (key === "keyword") {
    //     this.setState({'keyword': changedValues["keyword"].value});
    //   }
    // }
  };

  // 传给检索表单
  handleSubmit = (submitedData: any) => {
    console.log(submitedData);
    // const { getTempReportList } = this.props;
    this.setState({...submitedData});
    getTempReportListAction(submitedData);
    getCadreReportListAction(submitedData);
  };

  componentDidMount(): void {
    const {
      user,
      tempReportList,
      getTempReportListAction,
      getCadreReportListAction,
    } = this.props;
    const { feverCount, foreignCount } = this.state;
    // 默认取当天的数据
    const todayStart = moment()
      .startOf("day")
      .format(dateFormat);
    const now = moment()
      .locale("zh-cn")
      .format(dateFormat);
    getTempReportListAction({ start: todayStart, end: now, keyword: "" });
    tempReportList.forEach(item => {
      if (item.is_fever) {
        const newFeverCount = feverCount + 1;
        this.setState({ feverCount: newFeverCount });
      }
      if (item.foreign_flag) {
        const newForeignCount = foreignCount + 1;
        this.setState({ foreignCount: newForeignCount });
      }
    });
    // 01职员，02干部，03科室上报员
    if (user.duty === "02") {
      getCadreReportListAction({ start: todayStart, end: now, keyword: "" });
    }
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
        const { checkTempReportListAction } = this.props;
        // console.log("check selected reports: ", selectedRowKeys);
        checkTempReportListAction(selectedRowKeys);
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

  showConfirmCadre = (): void => {
    Modal.confirm({
      centered: true,
      className: "del-confirm",
      title: "确认审核",
      content: "确认审核所选干部报告吗？",
      cancelText: "取消",
      okText: "确定",
      onOk: async (): Promise<void> => {
        const { selectedRowKeysCadre } = this.state;
        const { checkCadreReportListAction } = this.props;
        // console.log("check selected reports: ", selectedRowKeys);
        checkCadreReportListAction(selectedRowKeysCadre);
        this.setState({
          selectedRowKeysCadre: [],
        });
      },
      onCancel: (): void => {
        this.setState({
          selectedRowKeysCadre: [],
        });
      },
    });
  };

  onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  onSelectChangeCadre = (selectedRowKeys: any) => {
    // console.log('cadre selection');
    // console.log(selectedRowKeys);
    this.setState({ selectedRowKeysCadre: selectedRowKeys });
  }

  handleDownloadClick = () => {
    console.log('donwload clicked');
    const { start, end, keyword } = this.state;
    // const todayStart = moment().startOf('week').format(dateFormat);
    // const todayStart = moment().subtract('days', 7).format(dateFormat);
    // const now = moment().locale('zh-cn').format(dateFormat);
    // downloadTempReportList({ start: todayStart, end: now, keyword: "" });
    // const downloadUrl = "http://localhost:8083/rest-api/report/temp/download/";
    const downloadUrl = "http://123.56.115.20:8083/rest-api/report/temp/download/";
    // const downloadUrl = "http://report.carryon.top/rest-api/report/temp/download/";
    axios({
      method: 'get',
      url: downloadUrl,
      params: { start: start, end: end, keyword: keyword },
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

  handleDownloadCadreClick = () => {
    console.log('donwload cadre clicked');
    const { start, end, keyword } = this.state;
    // const todayStart = moment().startOf('week').format(dateFormat);
    // const todayStart = moment().subtract('days', 7).format(dateFormat);
    // const now = moment().locale('zh-cn').format(dateFormat);
    // downloadTempReportList({ start: todayStart, end: now, keyword: "" });
    // const downloadUrl = "http://localhost:8083/rest-api/report/cadre/download/";
    const downloadUrl = "http://123.56.115.20:8083/rest-api/report/cadre/download/";
    // const downloadUrl = "http://report.carryon.top/rest-api/report/cadre/download/";
    axios({
      method: 'get',
      url: downloadUrl,
      params: { start: start, end: end, keyword: keyword },
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
    const { user, tempReportList, cadreReportList } = this.props;
    const { start, end , keyword, loading, feverCount, foreignCount, selectedRowKeys, selectedRowKeysCadre, page } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const rowSelectionCadre = {
      selectedRowKeys,
      onChange: this.onSelectChangeCadre,
    }
    const hasSelected = selectedRowKeys.length > 0;
    const hasSelectedCadre = selectedRowKeysCadre.length > 0;
    const columns: any = [
      {
        title: "人员类别",
        dataIndex: "role",
        key: "role",
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
        onFilter: (value: number, record: any) => record.role == value,
        render: (value: string) => {
          // const roleDict = ['在职职工', '外包公司', '医辅人员', '学生',]
          // const index = Number(value);
          // return <span>{roleDict[index]}</span>
          const roleObject: any = {
            '0': '在职职工',
            '1': '外包公司',
            '2': '医辅人员',
            '3': '学生',
          }
          return <span>{roleObject[value]}</span>
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
        title: "工号",
        dataIndex: "emp_code",
        key: "emp_code"
      },
      {
        title: "所在部门",
        dataIndex: "department",
        key: "department",
        // 中文排序方法
        sorter: (a: any, b: any) => a.localeCompare(b.department, 'zh-CN'),
      },
      {
        title: "是否发热",
        dataIndex: "is_fever",
        key: "is_fever",
        filters: [
          {
            text: "不发热",
            value: 0,
          },
          {
            text: "发热",
            value: 1,
          },
        ],
        onFilter: (value: number, record: any) => record.is_fever == value,
        render: (value: number) => {
          const color = value ? "red" : "green";
          const fever = value ? "是" : "否";
          return <span style={{ color: color }}> {fever}</span>;
        },
      },
      {
        title: "体温",
        dataIndex: "temperature",
        key: "temperature",
        render: (value: number) => {
          const color = value >= 37.2 ? "red" : "green";
          const temperature = value >= 37.2 ? value : "";
          return <span style={{ color: color }}>{temperature}</span>;;
        },
        sorter: (a: any, b: any) => a.temperature - b.temperature,
      },
      {
        title: "是否离京",
        dataIndex: "foreign_flag",
        key: "foreign_flag",
        filters: [
          {
            text: "未离京",
            value: 0,
          },
          {
            text: "离京",
            value: 1,
          },
        ],
        onFilter: (value: number, record: any) => record.foreign_flag == value,
        render: (value: number) => {
          const color = value ? "red" : "green";
          const foreign = value ? "是" : "否";
          return <span style={{ color: color }}>{foreign}</span >
        },
      },
      {
        title: "现在在哪",
        dataIndex: "from_where",
        key: "from_where",
      },
      {
        title: "上报日期",
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
    const cadre_columns: any = [
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
        title: "职务",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "是否在岗",
        dataIndex: "on_duty_flag",
        key: "on_duty_flag",
        filters: [
          {
            text: "在岗",
            value: 0,
          },
          {
            text: "不在岗",
            value: 1,
          },
        ],
        onFilter: (value: number, record: any) => record.on_duty_flag == value,
        render: (value: number) => {
          const color = value ? "red" : "green";
          const onDuty = value ? "是" : "否";
          return <span style={{ color: color }}>{onDuty}</span>;
        },
      },
      {
        title: "不在岗原因",
        dataIndex: "reason",
        key: "reason",
        // 中文排序方法
        sorter: (a: any, b: any) => a.localeCompare(b.reason, 'zh-CN'),
      },
      {
        title: "上报日期",
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
    ]

    return (
      <div className="temp-reports">
        <div className="temp-reports-header">我的上报卡</div>
        <Row type="flex" justify="start" className="temp-reports-link">
          <Col span={12}>
            <a href="/temp-report">新建体温上报</a>
          </Col>
          {user.duty === "02" ? (
            <Col span={12}>
              <a href="/cadre-report">新建干部在岗上报</a>
            </Col>) : ""}
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={18}>
            <SearchForm handleFieldsChange={this.handleFieldsChange} handleSubmit={this.handleSubmit}></SearchForm>
          </Col>
          <Col span={6}>
            <section className="temp-reports-summary">共检索到{tempReportList.length}份体温报告，{feverCount}份发热，{foreignCount}份离京</section>,
            <section className="cadre-reports-summary">共检索到{cadreReportList.length}份干部报告</section>,
          </Col>
        </Row>

        <div
          className="temp-report-div">
          <h3>每日体温上报</h3>
          <Table
            ref="temp-reports-table"
            rowSelection={rowSelection}
            className="temp-report-list temp-report-list-table"
            rowKey={record => record.id}
            columns={columns}
            dataSource={tempReportList}
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
                  display: user.duty === "03" ? "block" : "none"
                }}
                disabled={hasSelected ? false : true}
                onClick={this.showConfirm}
              >
                审核提交选体温报告
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
                下载体温报告到Excel文件
            </Button>
            </Col>
          </Row>
        </div>

        <div
          style={{ display: user.duty === "02" ? "block" : "none" }}
          className="cadre-report-div">
          <h3>每日干部在岗上报</h3>
          <Table
            ref="cadre-reports-table"
            // rowSelection={rowSelectionCadre}
            className="cadre-report-list cadre-report-list-table"
            rowKey={record => record.id}
            columns={cadre_columns}
            dataSource={cadreReportList}
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
                  display: user.duty === "03" ? "block" : "none"
                }}
                disabled={hasSelectedCadre ? false : true}
                onClick={this.showConfirmCadre}
              >
                审核提交选干部报告
            </Button>
            </Col>
            <Col>
              <Button
                style={{
                  margin: "15px",
                  float: "right",
                }}
                onClick={this.handleDownloadCadreClick}
              >
                下载干部报告到Excel文件
            </Button>
            </Col>
          </Row>
        </div>

      </div>
    );
  };
}

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  tempReportList: state.tempReportList,
  cadreReportList: state.cadreReportList,
  user: state.user,
  token: state.token,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  getTempReportListAction,
  checkTempReportListAction,
  checkCadreReportListAction,
  getCadreReportListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
