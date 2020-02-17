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
import { baseURL } from "_services/api";
import axios from "axios";
import echarts from "echarts";
import ReactEcharts from "echarts-for-react";
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
      if (changedValues.dtRange.length > 0) {
        const start = changedValues.dtRange.value[0].locale('zh-cn').format(dateFormat);
        const end = changedValues.dtRange.value[1].locale('zh-cn').format(dateFormat);
        const keyword = this.props.dailyReportSearchForm.keyword;
        this.props.setDailyReportSearchAction({ start: start, end: end, keyword: keyword });
      }
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
    console.log("donwload clicked");
    const downloadUrl = baseURL + "report/daily/download";
    axios({
      method: "get",
      url: downloadUrl,
      params: this.props.dailyReportSearchForm,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "blob",
    }).then((res: any) => {
      // let blob = new Blob([res]);
      let blob = new Blob([res.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      let a = document.createElement("a");
      let objectUrl = URL.createObjectURL(blob); // 创建下载链接
      a.href = objectUrl;
      document.body.appendChild(a);
      a.click(); // 点击下载
      // a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      document.body.removeChild(a);
      window.URL.revokeObjectURL(objectUrl); // 释放掉blob对象
    });
  }

  getOption() {
    return {
      title: {
        text: ''
      },
      //点击提示标签
      // tooltip: {},
      legend: {
        //图例文字展示
        data: [
          { name: '今日更新投诉量' },
          { name: '昨日更新投诉量' }],
        //图例显示在底部
        bottom: 0,
        //图例背景颜色
        backgroundColor: "transparent",
        // 图例标记的图形宽度。[ default: 25 ]
        itemWidth: 12,
        // 图例标记的图形高度。[ default: 14 ]
        itemHeight: 9,
        //图例文字样式设置
        textStyle: {
          color: "#333",                //文字颜色
          fontStyle: "normal",         //italic斜体  oblique倾斜
          fontWeight: "normal",        //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
          // fontFamily:"sans-serif",   //字体系列
          fontSize: 12,                //字体大小
        }
      },
      radar: {
        //雷达图绘制类型，支持 'polygon' 和 'circle' [ default: 'polygon' ]
        shape: 'polygon',
        splitNumber: 3,
        center: ['50%', '50%'],
        radius: '65%',
        //指示器名称和指示器轴的距离。[ default: 15 ]
        nameGap: 5,
        triggerEvent: true,
        name: {
          textStyle: {
            color: '#999',
            backgroundColor: 'transparent'
            // borderRadius: 3,
            // padding: [3, 5]
          },
          formatter: function (value: any, indicator: any) {
            value = value.replace(/\S{4}/g, function (match: any) {
              return match + '\n'
            })
            // value = value + '\n' + indicator.value;
            return '{a|' + value + '}' + '\n' + '{b|' + indicator.value + '}'
          },
          //富文本编辑 修改文字展示样式
          rich: {
            a: {
              color: "#999",
              fontSize: 12,
              align: "center"

            },
            b: {
              color: "#333",
              fontSize: 17,
              align: "center"
            }
          }
        },
        // 设置雷达图中间射线的颜色
        axisLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
        indicator: [
          { "name": "车辆已售", "value": 380, "max": 500 },
          { "name": "商家冒充个人", "value": 290, "max": 500 },
          { "name": "商家服务态度差", "value": 450, "max": 500 },
          { "name": "电话无法接通", "value": 300, "max": 500 },
          { "name": "走私套牌抵押车", "value": 480, "max": 500 },
          { "name": "价格高于标价", "value": 200, "max": 500 },
          { "name": "卖新车", "value": 350, "max": 500 },
          { "name": "图片与车款不符合", "value": 333, "max": 500 }
        ],
        //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
        splitArea: {
          show: false,
          areaStyle: {
            color: 'rgba(255,0,0,0)', // 图表背景的颜色
          },
        }
      },
      series: [{
        name: '投诉统计',
        type: 'radar',
        //显示雷达图选中背景
        areaStyle: { normal: {} },
        data: [
          {
            value: [380, 290, 450, 300, 480, 200, 350, 333],
            // 设置区域边框和区域的颜色
            itemStyle: {
              normal: {
                //雷达图背景渐变设置
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0.5,
                  color: 'rgba(48,107, 231, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(73,168, 255, 0.7)'
                }]),
                //去除刻度
                opacity: 0,
                //雷达图边线样式
                lineStyle: {
                  width: 0,
                  color: '#306BE7',
                },
              },
            },
            name: '今日更新投诉量',
            id: "jintian"
          },
          {
            value: [10, 250, 100, 370, 80, 500, 190, 400],
            // 设置区域边框和区域的颜色
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0.5,
                  color: 'rgba(139,241, 134, 0.7)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,208, 131, 1)'
                }]),
                opacity: 0,
                lineStyle: {
                  width: 0,
                  color: '#8BF186',
                },
              },
            },
            name: '昨日更新投诉量',
            id: "zuotian"
          }
        ]
      }]
    };
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
        sorter: (a: DailyReportI, b: DailyReportI) => {
          return a.department.localeCompare(b.department, 'zh-CN');
        }
      },
      {
        title: "人员角色",
        dataIndex: "role",
        key: "role",
        filters: [
          {
            text: "在职职工",
            value: "在职职工",
          },
          {
            text: "外包公司",
            value: "外包公司",
          },
          {
            text: "医辅人员",
            value: "医辅人员",
          },
          {
            text: "学生",
            value: "学生",
          },
        ],
        onFilter: (value: number, record: any) => record.emp_code == value,
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
            text: "否",
            value: '职员',
          },
          {
            text: "是",
            value: '干部',
          },
        ],
        onFilter: (value: number, record: any) => record.duty == value,
        render: (value: number) => {
          const dutyObject: any = {
            '职员': '否',
            '干部': '是',
          }
          return <span> {dutyObject[value]}</span>;
        },
      },
      {
        title: "填报日期",
        dataIndex: "created_at",
        key: "created_at",
        render: (value: string) => {
          const dt = moment(new Date(value));
          // console.log(dt.valueOf());
          return (
            <span> {dt.format('YYYY-MM-DD')} </span>
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
            text: "白班",
            value: "白班",
          },
          {
            text: "夜班",
            value: "夜班",
          },
          {
            text: "备班",
            value: "备班",
          },
          {
            text: "休假",
            value: "休假（含倒休）",
          },
          {
            text: "隔离观察",
            value: "隔离观察",
          },
          {
            text: "武汉支援（不填写体温情况）",
            value: "武汉支援（不填写体温情况）",
          },
          {
            text: "下乡",
            value: "下乡",
          },
          {
            text: "其他（在备注栏标注）",
            value: "其他（在备注栏标注）",
          },
        ],
        onFilter: (value: number, record: any) => record.work_status == value,
      },
      {
        title: "现工作科室",
        dataIndex: "work_department",
        key: "work_department",
        render: (text: string, record: any): ReactElement | string => {
          return (
            <span>{text}</span>
          )
        },
        // 中文排序方法
        sorter: (a: DailyReportI, b: DailyReportI) => {
          return a.work_department.localeCompare(b.work_department, 'zh-CN');
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
          const color = value > 37.2 ? "red" : "green";
          const dailyerature = value > 37.2 ? value : "";
          return <span style={{ color: color }}>{dailyerature}</span>;;
        },
        sorter: (a: any, b: any) => a.temperature - b.temperature,
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
      // {
      //   title: '操作',
      //   key: 'action',
      //   render: (text: string, record: DailyReportI) => {
      //     return (
      //       <span>
      //         删除
      //       </span>
      //     )
      //   }
      // }
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
        <Row type="flex" justify="start">
          <Col span={24}>
            <ReactEcharts
              notMerge={true}
              lazyUpdate={true}
              style={{ width: '100%', height: '100px' }}
              // theme={"dark"}
              // onChartReady={this.onCharReadyCallback}
              // onEvents={EventsDict}
              // opts={}
              option={this.getOption()}
            />
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
