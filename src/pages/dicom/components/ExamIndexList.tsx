import React from 'react';
import { Table, Icon, Button, Input } from 'antd';
import { IExamIndexList } from '../../../constants/interface';
import { FormattedMessage } from 'react-intl';
import { Resizable } from 'react-resizable';


// 组件不直接从reducer取数，通过父项传进来。
type IProps = {
    examIndexData: IExamIndexList[];
}

// 写object会取不到state的值
// class ExamIndexTable extends React.Component<IProps, object> {
class ExamIndexTable extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            examIndexData: props.examIndexData,
            examIndexColumns: [
                {
                    title: 'modality',
                    dataIndex: 'modality',
                    key: 'modality',
                },
                {
                    title: 'patient_name',
                    dataIndex: 'patient_name',
                    key: 'patient_name',
                },
                {
                    title: 'created_at',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    render: (value: any) => {
                        return value
                    },
                },
                {
                    title: 'desc',
                    dataIndex: 'desc',
                    key: 'desc',
                    fixed: 'right',
                },
            ]
        }
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        // console.log(this.props);
    }
    render() {
        const { examIndexData } = this.props;
        const { examIndexColumns } = this.state;
        return (
            <div>
                ExamIndexTable
                <Table
                    columns={examIndexColumns}
                    dataSource={examIndexData}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: 240 }}
                    rowKey={item=> item.id}
                >
                </Table>
            </div>
        );
    }
}


export default ExamIndexTable;
