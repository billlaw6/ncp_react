/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement, Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Dropdown, Menu, Icon, Pagination, Table, Checkbox, Modal } from "antd";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { StoreStateI, TempReportI } from "_constants/interface";

import {
  MapStateToPropsI,
  HomePropsI,
  HomeStateI,
  MapDispatchToPropsI,
  TableDataI,
} from "./type";
import { getTempReportListAction, checkTempReportListAction } from "_actions/report";

import { Gutter } from "antd/lib/grid/row";
import { PaginationConfig, ColumnProps, TableEventListeners } from "antd/lib/table";
import LinkButton from "_components/LinkButton/LinkButton";
// import Notice from "./components/Notice";

import "./Home.less";
import { Redirect } from "react-router";

const DEFAULT_PAGE_SIZE = 12;

class Home extends Component<HomePropsI, HomeStateI> {
  constructor(props: HomePropsI) {
    super(props);

    this.state = {
      isSelectable: false,
      page: 1,
      selectedRowKeys: [],
      loading: false,
      redirectReport: false,
    };
  }

  componentDidMount(): void {
    const { tempReportList, getList } = this.props;
    getList && getList({ dtRange: [new Date(), new Date()], keyword: "" });
  }

  onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys })
  }

  handleDownloadClick = () => {
    console.log('donwload clicked');
  }

  render(): ReactElement {
    const { loading, selectedRowKeys, isSelectable, page } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0;
    const columns: any = [
      {
        title: "人员类别",
        dataIndex: "role",
        key: 'role',
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
          const roleDict = ['在职职工', '外包公司', '医辅人员', '学生',]
          const index = Number(value);
          return <span>{roleDict[index]}</span>
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
              <span>{text}</span>
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
        sorter: (a: any, b: any) => a.department - b.department,
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
          return <span style={{ color: color }}> {fever}</span >
        },
      },
      {
        title: "体温",
        dataIndex: "temperature",
        key: "temperature",
        render: (value: number) => {
          const color = value > 37.2 ? "red" : "green";
          const temprature = value > 37.2 ? value : "";
          return <span style={{ color: color }}> {value}</span >
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
            text: "离京归来",
            value: 1,
          },
        ],
        onFilter: (value: number, record: any) => record.foreign_flag == value,
        render: (value: number) => {
          const color = value ? "red" : "green";
          const foreign = value ? "是" : "否";
          return <span style={{ color: color }}> {foreign}</span >
        },
      },
      {
        title: "从哪归来",
        dataIndex: "from_where",
        key: "from_where",
      },
      {
        title: "上报日期",
        dataIndex: "created_at",
        key: "created_at",
        render: (value: string) => {
          const dt = value.substr(0, 10);
          return <span> {dt} </span >
        },
        sorter: (a: any, b: any) => a.created_at - b.created_at,
      },
    ];

    const dataSource: any = this.props.tempReportList;

    const paginationConfig: PaginationConfig = {
      current: page,
      defaultPageSize: DEFAULT_PAGE_SIZE,
      total: dataSource.length,
      hideOnSinglePage: true,
      onChange: (page): void => {
        this.setState({ page });
      },
    };

    return (
      <div className="temp-reports">
        <div className="temp-reports-header">我的上报卡</div>
        <a href="/temp-report">新建体温上报</a>
        <Table
          ref="temp-reports-table"
          rowSelection={rowSelection}
          className="temp-report-list temp-report-list-table"
          rowKey={"id"}
          columns={columns}
          dataSource={dataSource}
          // dataSource={tempReportList}
          pagination={paginationConfig}
          onRow={(record): TableEventListeners => {
            return {
              onClick: (): void => {
                // this.onClickItem(record.id);
              },
            };
          }}
        ></Table>

        <Button
          style={{
            margin: '15px',
            float: 'right',
          }}
          onClick={this.handleDownloadClick}>
          下载全部数据到Excel文件
          </Button>

        {/* <ReactHTMLTableToExcel
          id = "export-table-xls-button"
          className="download-excel-button"
          table="table-to-xls"
          filename={"体温报告" + 123}
          sheet={"体温报告" + 123}
          buttonText="导出表格到Excel"/> */}
      </div>
    );
  };

  showConfirm = (): void => {
    Modal.confirm({
      centered: true,
      className: "del-confirm",
      title: "确认审核",
      content: "确认审核所选报告吗？",
      cancelText: "取消",
      okText: "确定",
      onOk: async (): Promise<void> => {
        await this.checkTempReport();
        this.setState({
          isSelectable: false,
          selectedRowKeys: [],
        });
      },
      onCancel: (): void => {
        this.setState({
          isSelectable: false,
          selectedRowKeys: [],
        });
      },
    });
  };

  /* === APIS 与服务器交互数据的方法 START === */

  /**
   * 审核所选报告
   *
   * @memberof Home
   */
  checkTempReport = async (): Promise<void> => {
    const { selectedRowKeys } = this.state;
    const { checkList } = this.props;
    console.log("check selected reports: ", selectedRowKeys);
    checkList(selectedRowKeys);
  };
  /* === APIS 与服务器交互数据的方法 END === */

}


const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  tempReportList: state.tempReportList,
  user: state.user,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  getList: getTempReportListAction,
  checkList: checkTempReportListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
