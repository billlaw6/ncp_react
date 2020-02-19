import React, { FormEvent } from "react";
import { connect } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI } from "./type";
// import echarts from "echarts";
import ReactEcharts from "echarts-for-react"
import { statsDailyReportList } from "_services/report"

export interface StatsStateI {
    statsDailyReport: {
        branch_stats: any[];
        dept_stats: any[];
    };
}

class Stats extends React.Component<MapStateToPropsI, StatsStateI> {
    constructor(props: MapStateToPropsI) {
        super(props);
        this.state = {
            statsDailyReport: {
                branch_stats: [],
                dept_stats: [],
            },
        };
        this.getOption = this.getOption.bind(this); //
    };
    componentDidMount() {
        const { dailyReportSearchForm, } = this.props;
        statsDailyReportList(dailyReportSearchForm).then((res) => {
            this.setState({
                statsDailyReport:
                    res.data
            })
        }).catch((err) => {
            console.log(err);
            // history.push("/login");
        })
    }

    getOption() {
        const { statsDailyReport } = this.state;
        // console.log(statsDailyReport);
        show:
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['正常报告', '发热报告']
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true },
                }
            },
            calculable: true,
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'value',
            }],
            yAxis: [{
                type: 'category',
                data: statsDailyReport.dept_stats.map((item: any) => {
                    return item[0]
                })
            }],
            series: [
                {
                    name: '正常报告',
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: statsDailyReport.dept_stats.map((item: any) => {
                        return item[1]
                    }),
                    color: '#CC0066',
                },
                {
                    name: '正常报告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: statsDailyReport.dept_stats.map((item: any) => {
                        return item[1] + 1
                    }),
                    color: '#CC0011',
                },
                {
                    name: '正常报告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: statsDailyReport.dept_stats.map((item: any) => {
                        return item[1] + 1
                    }),
                    color: '#220011',
                },
                {
                    name: '正常报告',
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: statsDailyReport.dept_stats.map((item: any) => {
                        return item[1] + 1
                    }),
                    color: '#CC0011',
                },
            ]
        };
    }

    render() {
        return (
            <div>
                <ReactEcharts
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '300px' }}
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
export default connect(mapStateToProps)(Stats);
