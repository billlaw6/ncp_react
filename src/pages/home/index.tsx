/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement, Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Dropdown, Menu, Icon, Pagination, Table } from "antd";
import DicomCard from "_components/DicomCard/DicomCard";
import { StoreStateI, ExamIndexListI } from "_constants/interface";

import {
  MapStateToPropsI,
  HomePropsI,
  HomeStateI,
  ViewTypeEnum,
  SortTypeEnum,
  MapDispatchToPropsI,
} from "./type";
import { submitExamIndexSearchAction } from "_actions/dicom";
import "./Home.less";

import mockData from "./mock";
import { Gutter } from "antd/lib/grid/row";

const DEFAULT_PAGE_SIZE = 12;

class Home extends Component<HomePropsI, HomeStateI> {
  constructor(props: HomePropsI) {
    super(props);

    this.state = {
      viewType: ViewTypeEnum.GRID,
      sortType: SortTypeEnum.TIME,
      isSelectable: false,
      page: 1,
      selections: [],
    };
  }

  componentDidMount(): void {
    // const { getList } = this.props;
    // getList && getList({ dtRange: [new Date(), new Date()], keyword: "" });
  }

  list = (): ReactElement | undefined => {
    const { selections } = this.state;
    const renderList = this.getCurrentItem();
    const columns = [
      { title: "类型", dataIndex: "modality" },
      { title: "姓名", dataIndex: "patient_name" },
      { title: "上传日期", dataIndex: "study_date" },
      { title: "备注", dataIndex: "desc" },
      { title: "", dataIndex: "ctl" },
    ];

    const rowSelection = {
      selectedRowKeys: selections,
      // onChange: this.onSelectChange,
    };

    return <Table columns={columns}></Table>;
  };

  dicoms = (): ReactElement | undefined => {
    const { examIndexList } = this.props;
    const { page } = this.state;
    const renderList = this.getCurrentItem();
    console.log("renderList", renderList);

    if (!examIndexList || !examIndexList.length) {
      const rows: ReactElement[] = [];
      let cols: ReactElement[] = [];
      const gutter: [Gutter, Gutter] = [
        { xs: 8, sm: 16, md: 24 },
        { xs: 20, sm: 30, md: 40 },
      ];

      let count = 0;

      renderList.forEach(item => {
        const { id, patient_name, study_date, desc, thumbnail, modality } = item;
        if (count >= 4) {
          count = 0;
          rows.push(
            <Row key={rows.length} type="flex" gutter={gutter} align="middle">
              {cols}
            </Row>,
          );
          cols = [];
        }

        cols.push(
          <Col key={id} xs={24} md={12} lg={8} xl={6}>
            <DicomCard
              id={id}
              patientName={patient_name}
              studyDate={study_date}
              desc={desc}
              thumbnail={thumbnail}
              modality={modality}
            ></DicomCard>
          </Col>,
        );
      });

      rows.push(
        <Row key={rows.length} type="flex" gutter={gutter} align="top">
          {cols}
        </Row>,
      );

      return (
        <div className="dicom-list dicom-list-square">
          {rows}
          <Pagination
            hideOnSinglePage={false}
            current={page}
            defaultPageSize={DEFAULT_PAGE_SIZE}
            total={mockData.length}
            onChange={(page): void => {
              this.setState({ page });
            }}
          ></Pagination>
        </div>
      );
    }
  };

  getCurrentItem = (): ExamIndexListI[] => {
    const { page } = this.state;
    return mockData.slice((page - 1) * DEFAULT_PAGE_SIZE, page * DEFAULT_PAGE_SIZE);
  };

  controller = (): ReactElement => {
    return (
      <div id="controller" className="controller">
        <div className="controller-left">
          <span className="controller-title">影像列表</span>
          <Button icon="cloud-upload" shape="round" className="controller-upload">
            上传
          </Button>
          <Icon className="controller-del iconfont" type="delete" />
        </div>
        <div className="controller-right">
          <Dropdown overlay={this.dropdownContent()} placement="bottomRight">
            <Icon className="controller-select-sort iconfont" type="sort-ascending" />
          </Dropdown>
          <Icon className="controller-select-view iconfont" type="appstore" />
        </div>
      </div>
    );
  };

  /**
   * 返回列表排序的内容部分
   *
   * @memberof Home
   */
  dropdownContent = (): ReactElement => {
    return (
      <Menu onClick={(): void => {}}>
        <Menu.Item key={SortTypeEnum.TIME}>时间排序</Menu.Item>
        <Menu.Item key={SortTypeEnum.TYPE}>种类排序</Menu.Item>
      </Menu>
    );
  };

  render(): ReactElement {
    return (
      <section className="home">
        {this.controller()}
        {this.dicoms()}
      </section>
    );
  }
}

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  examIndexList: state.examIndexList,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  getList: submitExamIndexSearchAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
