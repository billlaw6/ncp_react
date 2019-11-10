import React from 'react';
import { Form, Table, Button, Select, Input, DatePicker } from 'antd';
import { IStoreState } from '../../../constants/store.d';
import { fetchUserListAction } from '../../../actions/user';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker; //获取日期选择控件中的日期范围控件

const mapStateToProps = (state: IStoreState) => {
    return {
        userList: state.userList,
    };
};
type IStateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    fetchUserListAction,
};

class UserManage extends React.Component {
    render() {
        const columns = [
            {
                title: '联系人',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile',
            },
            {
                title: '公司名称',
                dataIndex: 'companyName',
                key: 'companyName',
            },
            {
                title: '最近活跃时间',
                dataIndex: 'lastOnlineTime',
                key: 'lastOnlineTime',
            },
            {
                title: '禁言状态',
                dataIndex: 'status',
                key: 'status',
            },
        ];

        return (
            <div>
                <Form layout="inline" style={{ marginBottom: '10px' }}>
                    <FormItem label="最近活跃时间">
                        <RangePicker style={{ width: '255px' }} />
                    </FormItem>
                    <FormItem label="用户">
                        <Input
                            type="text"
                            placeholder="公司名称、手机号"
                            style={{ width: '155px' }}
                        />
                    </FormItem>
                    <FormItem label="禁言状态">
                        <Select defaultValue="全部" style={{ width: '155px' }}>
                            <Option value="全部">全部</Option>
                            <Option value="是">是</Option>
                            <Option value="否">否</Option>
                        </Select>
                    </FormItem>
                    <Button
                        type="primary"
                        style={{ marginTop: '3px', marginRight: '3px' }}>
                        查询
                    </Button>
                    <Button style={{ marginTop: '3px' }}>重置</Button>
                </Form>
                <Table columns={columns} />
            </div>
        );
    }
}

export default Form.create()(UserManage);
