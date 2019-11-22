import React from 'react';
import { connect } from 'react-redux';
import { DicomInfoSearchForm, ResizableTitle, DicomInfoTable } from './components/DicomManage';
import { IDicomInfo, IDicomSearchState, IStoreState } from '../../constants/store.d';
import {
    dicomSearchRequstedAction,
    dicomSearchSucceededAction,
    dicomSearchFailedAction,
    DICOM_SEARCH_FAILED_ACTION,
    DICOM_SEARCH_REQUESTED_ACTION,
    DICOM_SEARCH_SUCCEEDED_ACTION
} from '../../actions/dicom';
import { ColumnProps } from 'antd/es/table';
import { InputSizes } from 'antd/lib/input/Input';
import moment from 'moment';
import { Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { DicomPlayer } from './components/DicomPlayer';

const mapStateToProps = (state: IStoreState) => {
    return {
        dicomList: state.dicomList,
    };
};
const mapDispatchToProps = {
    dicomSearchRequstedAction,
    dicomSearchSucceededAction,
    dicomSearchFailedAction,
};

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
// state作为本页面或组件的默认值，使其不依赖外部变量。
type IState = {
    fields: {
        dtRange: Array<Date>;
        keyword: string;
        status: string;
        count: number;
        results: Array<IDicomInfo>
    },
    searchText: string;
}
class Dicom extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: props.dicomList,
            searchText: '',
        }
    }
    components = {
        header: {
            cell: ResizableTitle,
        }
    }
    handleFormChange = (changedFields: IDicomSearchState) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
        this.props.dicomSearchSucceededAction(changedFields);
    }

    handleFormSubmit = (submitedFormData: IDicomSearchState) => {
        console.log(submitedFormData);
        this.props.dicomSearchRequstedAction(submitedFormData);
    }
    // handleResize = (index: any) => (e: any, { size: any }) => {
    //     this.setState(({ columns: any }) => {
    //         const nextColumns = [...columns];
    //         nextColumns[index] = {
    //             ...nextColumns[index],
    //             width: size.width,
    //         }
    //         return { columns: nextColumns };
    //     })
    // }
    // getColumnSearchProps = (dataIndex: any) => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
    //         <div style={{ padding: 8 }}>
    //             <Input
    //                 ref={node => {
    //                     this.searchInput = node;
    //                 }}
    //                 placeholder={`Search ${dataIndex}`}
    //                 value={selectedKeys[0]}
    //                 onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //                 onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
    //                 style={{ width: 188, marginBottom: 8, display: 'block' }}
    //             />
    //             <Button
    //                 type="primary"
    //                 onClick={() => this.handleSearch(selectedKeys, confirm)}
    //                 icon="search"
    //                 size="small"
    //                 style={{ width: 90, marginRight: 8 }}
    //             >
    //                 Search
    //         </Button>
    //             <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
    //                 Reset
    //         </Button>
    //         </div>
    //     ),
    //     filterIcon: (filtered: any) => (
    //         <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    //     ),
    //     onFilter: (value: any, record: any) =>
    //         record[dataIndex]
    //             .toString()
    //             .toLowerCase()
    //             .includes(value.toLowerCase()),
    //     onFilterDropdownVisibleChange: (visible: any) => {
    //         if (visible) {
    //             setTimeout(() => this.searchInput.select());
    //         }
    //     },
    //     render: (text: any) => (
    //         <Highlighter
    //             highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //             searchWords={[this.state.searchText]}
    //             autoEscape
    //             textToHighlight={text.toString()}
    //         />
    //     ),
    // });

    // handleSearch = (selectedKeys: any, confirm: any) => {
    //     confirm();
    //     this.setState({ searchText: selectedKeys[0] });
    // };

    // handleReset = (clearFilters: any) => {
    //     clearFilters();
    //     this.setState({ searchText: '' });
    // };
    render() {
        const { fields } = this.state;
        // console.log(fields);
        const columns: ColumnProps<IDicomInfo>[] = [
            {
                title: 'study_uid',
                width: 150,
                dataIndex: 'study_uid',
                key: 'study_uid',
                fixed: 'left',
            },
            {
                title: 'patient_name',
                dataIndex: 'patient_name',
                key: '1',
                width: 150,
            },
            {
                title: 'patient_id',
                dataIndex: 'patient_id',
                key: '2',
            },
            {
                title: 'birthday',
                dataIndex: 'birthday',
                key: '3',
                width: 120,
                render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>,
            },
            {
                title: 'sex',
                dataIndex: 'sex',
                key: '4',
                width: 90,
                filters: [
                    {
                        text: 'F',
                        value: 'F',
                    },
                    {
                        text: 'M',
                        value: 'M',
                    },
                ],
                onFilter: (value: any, record: any) => {
                    // console.log(record);
                    return (record.sex.indexOf(value) === 0)
                },
            },
            {
                title: 'institution_name',
                dataIndex: 'institution_name',
                key: '5',
                ellipsis: true,
            },
            {
                title: 'modality',
                dataIndex: 'modality',
                key: '6',
                filters: [
                    {
                        text: 'MR',
                        value: 'MR',
                    },
                    {
                        text: 'CT',
                        value: 'CT',
                    },
                    {
                        text: 'XA',
                        value: 'XA',
                    },
                ],
                onFilter: (value: any, record: any) => record.modality.indexOf(value) === 0,
                sorter: (a: any, b: any) => {
                    // console.log(a);
                    return a.modality - b.modality;
                },
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'series_id',
                dataIndex: 'series_id',
                key: '7',
                width: 100,
            },
            {
                title: 'window_width',
                dataIndex: 'window_width',
                key: '8',
            },
            {
                title: 'window_center',
                dataIndex: 'window_center',
                key: '9',
            },
            {
                title: 'instance_id',
                dataIndex: 'instance_id',
                key: '10',
                ellipsis: true,
            },
            {
                title: 'created_at',
                dataIndex: 'created_at',
                key: 'created_at',
                ellipsis: true,
                render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: 'Action',
                width: 100,
                key: 'operation',
                fixed: 'right',
                render: () => <a>action</a>
            }
        ];
        // const resizableColumns = columns.map((col, index) => ({
        //     ...col,
        //     onHeaderCell: column => ({
        //         width: column.width,
        //         onResize: this.handleResize(index),
        //     })
        // }));

        return (
            <>
                <DicomInfoSearchForm fields={fields} onChange={this.handleFormChange} onSubmit={this.handleFormSubmit} />
                <DicomInfoTable
                    bordered
                    components={this.components}
                    rowKey="id"
                    dataSource={this.props.dicomList.results}
                    columns={columns}
                    scroll={{ x: 1800, y: 400 }}
                />
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dicom);