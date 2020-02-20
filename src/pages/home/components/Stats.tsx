import React, { FormEvent } from "react";
import { connect } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI } from "./type";
// import echarts from "echarts";
import ReactEcharts from "echarts-for-react"
import { statsDailyReportList } from "_services/report"

export interface StatsStateI {
    xAxisColumns: string[],
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
    };
    componentDidMount() {
        const { dailyReportSearchForm, } = this.props;
        statsDailyReportList(dailyReportSearchForm).then((res) => {
            this.setState({
                statsDailyReport: res.data
            })
        }).catch((err) => {
            console.log(err);
            // history.push("/login");
        })
    }

    getOption() {
        const { xAxisColumns, statsDailyReport } = this.state;
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
                data: ['总人数', '白班', '夜班', '备班', '休假', '隔离观察', '武汉支援', '下乡', '其他', '正常', '发热']
            },
            toolbox: {
                show: false,
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
                data: (() => {
                    let yColumns: string[] = [];
                    let empCount: number[] = [];
                    statsDailyReport.dept_stats.map((item: any) => {
                        if (yColumns.indexOf(item[1]) === -1) {
                            yColumns.push(item[1])
                        }
                    })
                    // console.log(yColumns);
                    return yColumns;
                })(),
            }],
            series: [
                {
                    name: '总人数',
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let empCount: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            // console.log(item);
                            if (yColumns.indexOf(item[1]) === -1) {
                                yColumns.push(item[1])
                                // 科室人数各行一样，加一条就行
                                empCount.push(item[2]);
                            }
                        })
                        return empCount;
                    })(),
                    color: '#0780cf',
                },
                {
                    name: '白班',
                    type: 'bar',
                    stack: '工作状态',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[1])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                console.log(yColumns);
                                console.log(item[3]);
                                if (item[3] === "01") {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        console.log(data);
                        return data;
                    })(),
                    color: '#C0C0C0',
                },
                {
                    name: '夜班',
                    type: 'bar',
                    stack: '工作状态',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[1])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                console.log(yColumns);
                                console.log(item[3]);
                                if (item[3] === "02") {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        console.log(data);
                        return data;
                    })(),
                    color: '#696969',
                },
                {
                    name: '备班',
                    type: 'bar',
                    stack: '工作状态',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[1])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                console.log(yColumns);
                                console.log(item[3]);
                                if (item[3] === "03") {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        console.log(data);
                        return data;
                    })(),
                    color: '#0e2c82',
                },
                {
                    name: '休假（含倒休）',
                    type: 'bar',
                    stack: '工作状态',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[5])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                console.log(yColumns);
                                console.log(item[3]);
                                if (item[3] === "04") {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        console.log(data);
                        return data;
                    })(),
                    color: '#b6b51f',
                },
                {
                    name: '隔离观察',
                    type: 'bar',
                    stack: '工作状态',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[1])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                console.log(yColumns);
                                console.log(item[3]);
                                if (item[3] === "05") {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        console.log(data);
                        return data;
                    })(),
                    color: '#da1f18',
                },
                {
                    name: '武汉支援',
                    type: 'bar',
                    stack: '工作状态',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[1])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                console.log(yColumns);
                                console.log(item[6]);
                                if (item[3] === "02") {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        console.log(data);
                        return data;
                    })(),
                    color: '#701866',
                },
                {
                    name: '下乡',
                    type: 'bar',
                    stack: '工作状态',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[1])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                console.log(yColumns);
                                console.log(item[3]);
                                if (item[3] === "07") {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        console.log(data);
                        return data;
                    })(),
                    color: '#f47a75',
                },
                {
                    name: '其他',
                    type: 'bar',
                    stack: '工作状态',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[1])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                if (item[3] === "08") {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        // console.log(data);
                        return data;
                    })(),
                    color: '#009db2',
                },
                {
                    name: '正常',
                    type: 'bar',
                    stack: '是否发热',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[1])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                if (item[4] === 0) {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        console.log(data);
                        return data;
                    })(),
                    color: '#008000',
                },
                {
                    name: '发热',
                    type: 'bar',
                    stack: '是否发热',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: (() => {
                        let yColumns: string[] = [];
                        let data: number[] = [];
                        statsDailyReport.dept_stats.map((item: any) => {
                            console.log(item);
                            // 如果是新科室则要新建一个数据项
                            let index = yColumns.indexOf(item[1])
                            console.log(index);
                            if ( index === -1) {
                                yColumns.push(item[1])
                                if (item[4] === 1) {
                                    data.push(item[5]);
                                } else {
                                    data.push(0);
                                }
                            } else if (yColumns.length === data.length) {
                            // 如果科室存在，则数据加到相同序列位置
                                data[index] = data[index] + item[5]
                            }
                        })
                        console.log(data);
                        return data;
                    })(),
                    color: '#ff0033',
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
