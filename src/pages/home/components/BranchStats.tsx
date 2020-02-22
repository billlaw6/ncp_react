import React, { FormEvent } from "react";
import { connect } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI } from "./type";
// import echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { statsDailyReportList } from "_services/report";

export interface BranchStatsStateI {
  xAxisColumns: string[];
  statsDailyReport: {
    branch_stats: any[];
    dept_stats: any[];
  };
}

class BranchStats extends React.Component<MapStateToPropsI, BranchStatsStateI> {
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
      // title: {
      //     text: "中层及以上干部情况统计",
      //     // subtext: '',
      //     left: '50%',
      //     textAlign: 'center',
      //     textStyle: {
      //         fontSize: 16,
      //         color: '#000',
      //     }
      // },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: [
          "干部总人数",
          "白班干部",
          "夜班干部",
          "备班干部",
          "休假干部",
          "隔离观察干部",
          "武汉支援干部",
          "下乡干部",
          "其他干部",
          "干部正常报告",
          "干部发热报告",
        ],
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
              if (yColumns.indexOf(item[0]) === -1 && item[2] === "02") {
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
          name: "干部总人数",
          type: "bar",
          label: {
            show: true,
            position: "insideRight",
          },
          data: (() => {
            let bColumns: string[] = [];
            let dColumns: string[] = [];
            let empCount: number[] = [];
            statsDailyReport.dept_stats.map((item: any) => {
              let bIndex = bColumns.indexOf(item[0]);
              // 院区没添加过时，添加对应院区和科室
              if (bIndex === -1 && item[2] === "02") {
                bColumns.push(item[0]);
                dColumns.push(item[1]);
                empCount.push(item[3]);
              } else {
                // 院区添加过，一个科室只加一次人数
                // 按院区统计只统计干部
                if (dColumns.indexOf(item[1]) !== -1 && item[2] === "02") {
                  empCount[bIndex] = empCount[bIndex] + item[3];
                }
              }
              console.log(item);
              console.log(bColumns);
              console.log(empCount);
            });
            return empCount;
          })(),
          color: "#0780cf",
        },
        {
          name: "白班干部",
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
              let index = yColumns.indexOf(item[1]);
              if (index === -1) {
                yColumns.push(item[1]);
                if (item[4] === "01" && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === "01" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[5];
              }
            });
            return data;
          })(),
          color: "#C0C0C0",
        },
        {
          name: "夜班干部",
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
              let index = yColumns.indexOf(item[1]);
              if (index === -1) {
                yColumns.push(item[1]);
                if (item[4] === "02" && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === "02" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[6];
              }
            });
            return data;
          })(),
          color: "#696969",
        },
        {
          name: "备班干部",
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
              let index = yColumns.indexOf(item[1]);
              if (index === -1) {
                yColumns.push(item[1]);
                if (item[4] === "03" && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === "03" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[6];
              }
            });
            return data;
          })(),
          color: "#0e2c82",
        },
        {
          name: "休假（含倒休）干部",
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
                yColumns.push(item[1]);
                if (item[4] === "04" && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === "04" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[6];
              }
            });
            return data;
          })(),
          color: "#b6b51f",
        },
        {
          name: "隔离观察干部",
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
              let index = yColumns.indexOf(item[1]);
              if (index === -1) {
                yColumns.push(item[1]);
                if (item[4] === "05" && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === "05" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[6];
              }
            });
            return data;
          })(),
          color: "#da1f18",
        },
        {
          name: "武汉支援干部",
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
              let index = yColumns.indexOf(item[1]);
              if (index === -1) {
                yColumns.push(item[1]);
                if (item[4] === "06" && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === "06" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[6];
              }
            });
            return data;
          })(),
          color: "#701866",
        },
        {
          name: "下乡干部",
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
              let index = yColumns.indexOf(item[1]);
              if (index === -1) {
                yColumns.push(item[1]);
                if (item[4] === "07" && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === "07" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[6];
              }
            });
            return data;
          })(),
          color: "#f47a75",
        },
        {
          name: "其他干部",
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
              let index = yColumns.indexOf(item[1]);
              if (index === -1) {
                yColumns.push(item[1]);
                if (item[4] === "08" && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[4] === "08" && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[6];
              }
            });
            return data;
          })(),
          color: "#009db2",
        },
        {
          name: "干部正常报告",
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
              let index = yColumns.indexOf(item[1]);
              if (index === -1) {
                yColumns.push(item[1]);
                if (item[5] === 0 && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[5] === 0 && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[6];
              }
            });
            return data;
          })(),
          color: "#008000",
        },
        {
          name: "干部发热报告",
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
              let index = yColumns.indexOf(item[1]);
              if (index === -1) {
                yColumns.push(item[1]);
                if (item[5] === 1 && item[2] === "02") {
                  data.push(item[6]);
                } else {
                  data.push(0);
                }
              } else if (yColumns.length === data.length && item[5] === 1 && item[2] === "02") {
                // 如果科室存在，则数据加到相同序列位置
                data[index] = data[index] + item[6];
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
});
export default connect(mapStateToProps)(BranchStats);
