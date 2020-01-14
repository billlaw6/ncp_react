/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement, Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Dropdown, Menu } from "antd";
import DicomCard from "_components/DicomCard/DicomCard";
import { StoreStateI } from "_constants/interface";

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

class Home extends Component<HomePropsI, HomeStateI> {
  constructor(props: HomePropsI) {
    super(props);

    this.state = {
      viewType: ViewTypeEnum.GRID,
      sortType: SortTypeEnum.TIME,
      isSelectable: false,
    };
  }

  componentDidMount(): void {
    // const { getList } = this.props;
    // getList && getList({ dtRange: [new Date(), new Date()], keyword: "" });
  }

  dicoms = (): ReactElement | undefined => {
    const { examIndexList } = this.props;
    console.log("examIndexList", examIndexList);

    if (!examIndexList || !examIndexList.length) {
      const rows: ReactElement[] = [];
      let cols: ReactElement[] = [];
      const gutter: [Gutter, Gutter] = [
        { xs: 8, sm: 16, md: 24 },
        { xs: 20, sm: 30, md: 40 },
      ];

      let count = 0;

      mockData.forEach(item => {
        const { id, patient_name, study_date, desc, thumbnail, modality } = item;
        if (count >= 4) {
          count = 0;
          rows.push(
            <Row type="flex" gutter={gutter} align="middle">
              {cols}
            </Row>,
          );
          cols = [];
        }

        cols.push(
          <Col xs={24} md={12} lg={8} xl={6}>
            <DicomCard
              key={id}
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
        <Row type="flex" gutter={gutter} align="middle">
          {cols}
        </Row>,
      );

      return <div className="dicom-list">{rows}</div>;
    }
  };

  controller = (): ReactElement => {
    return (
      <div id="controller" className="controller">
        <div className="controller-left">
          <span className="controller-title">影像列表</span>
          <Button icon="cloud-upload" shape="round" className="controller-upload">
            上传
          </Button>
          <span className="controller-del iconfont">删除</span>
        </div>
        <div className="controller-right">
          <Dropdown overlay={this.dropdownContent()} placement="bottomRight">
            <span className="controller-select-sort iconfont">Dropdown</span>
          </Dropdown>
          <span className="controller-select-view iconfont">改变显示类型</span>
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
