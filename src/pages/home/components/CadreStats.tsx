import React, { FormEvent } from "react";
import { connect } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI } from "./type";
// import echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { statsDailyReportList } from "_services/report";

export interface StatsStateI {
  xAxisColumns: string[];
  statsDailyReport: {
    branch_stats: any[];
    dept_stats: any[];
  };
}

class Stats extends React.Component<MapStateToPropsI, StatsStateI> {
  constructor(props: MapStateToPropsI) {
    super(props);
    this.state = {
      xAxisColumns: [],
      statsDailyReport: {
        branch_stats: [],
        dept_stats: [],
      },
    };
    this.getOption = this.getOption.bind(this); //
  }
  componentDidMount() {
    const { dailyReportSearchForm } = this.props;
    statsDailyReportList(dailyReportSearchForm)
      .then(res => {
        this.setState({
          statsDailyReport: res.data,
        });
      })
      .catch(err => {
        console.log(err);
        // history.push("/login");
      });
  }

  getOption() {
    const { xAxisColumns, statsDailyReport } = this.state;
    // console.log(statsDailyReport);
    show: return {
      title: {
          text: "干部报告统计",
          // subtext: '',
          left: '50%',
          textAlign: 'center',
          textStyle: {
              margin: 20,
              fontSize: 16,
              color: '#000',
          }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: [
          "总报告数",
          "白班",
          "夜班",
          "备班",
          "休假",
          "隔离观察",
          "武汉支援",
          "下乡",
          "其他",
          "正常",
          "发热",
        ],
        top: "10%",
      },
      toolbox: {
        show: false,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "value",
        },
      ],
      yAxis: [
        {
          type: "category",
          data: (() => {
            let yColumns: string[] = [];
            let empCount: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              if (yColumns.indexOf(item[0]) === -1) {
                yColumns.push(item[0]);
              }
            });
            // console.log(yColumns);
            return yColumns;
          })(),
        },
      ],
      series: [
        {
          name: "总干部报告数",
          type: "bar",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let empCount: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              let index = yColumns.indexOf(item[0]);
              // 科室没出现过增加对应数据元素
              if (index === -1 && item[2] === "02") {
                yColumns.push(item[0]);
                empCount.push(item[5]);
              } else if (item[2] === "02") {
                // 科室出现过，在对应数据元素节点上累加
                empCount[index] = empCount[index] + item[5];
              }
            });
            return empCount;
          })(),
          color: "#0780cf",
        },
        {
          name: "白班",
          type: "bar",
          stack: "工作状态",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[0]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[3] === "01" && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[3] === "01" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#C0C0C0",
        },
        {
          name: "夜班",
          type: "bar",
          stack: "工作状态",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[0]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[3] === "02" && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[3] === "02" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#696969",
        },
        {
          name: "备班",
          type: "bar",
          stack: "工作状态",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[0]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[3] === "03" && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[3] === "03" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#0e2c82",
        },
        {
          name: "休假（含倒休）",
          type: "bar",
          stack: "工作状态",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[5]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[3] === "04" && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[3] === "04" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#b6b51f",
        },
        {
          name: "隔离观察",
          type: "bar",
          stack: "工作状态",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[0]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[3] === "05" && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[3] === "05" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#da1f18",
        },
        {
          name: "武汉支援",
          type: "bar",
          stack: "工作状态",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[0]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[3] === "06" && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[3] === "06" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#701866",
        },
        {
          name: "下乡",
          type: "bar",
          stack: "工作状态",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[0]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[3] === "07" && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[3] === "07" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#f47a75",
        },
        {
          name: "其他",
          type: "bar",
          stack: "工作状态",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[0]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[3] === "08" && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[3] === "08" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#009db2",
        },
        {
          name: "正常",
          type: "bar",
          stack: "是否发热",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[0]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[4] === 0 && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === 0 && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#008000",
        },
        {
          name: "发热",
          type: "bar",
          stack: "是否发热",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let data: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              // 如果是新科室则要新建一个数据项
              let index = yColumns.indexOf(item[0]);
              if (index === -1) {
                yColumns.push(item[0]);
                if (item[4] === 1 && item[2] === "02") {
                  data.push(item[5]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === 1 && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#ff0033",
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <ReactEcharts
          notMerge={true}
          lazyUpdate={true}
          style={{ width: "100%", height: "300px" }}
          // theme={"dark"}
          // onChartReady={this.onCharReadyCallback}
          // onEvents={EventsDict}
          // opts={}
          option={this.getOption()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  dailyReportSearchForm: state.dailyReportSearchForm,
  dailyReportStats: state.dailyReportStats,
});
export default connect(mapStateToProps)(Stats);
