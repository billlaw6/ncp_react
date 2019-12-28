import React from 'react';
import { Table, Icon, Button, Input } from 'antd';
import { IExamIndexList } from '../../../constants/interface';
import { FormattedMessage } from 'react-intl';
import { Resizable } from 'react-resizable';


// 组件不直接从reducer取数，通过父项传进来。
type IProps = {
    examIndexData: IExamIndexList[];
}

class ExamIndexTable extends React.Component<IProps, object> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            examIndexData: props.examIndexData,
            examIndexColumns: [
                {
                   title: 'patient_name',
                   dataIndex: 'patient_name',
                   key: 'patient_name',
                }
            ]
        }
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        console.log(this.props);
    }
    render() {
        return (
            <div>
                ExamIndexTable
            </div>
        );
    }
}


export default ExamIndexTable;
