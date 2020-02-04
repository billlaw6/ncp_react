/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement, Component, FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Dropdown, Menu, Icon, Pagination, Table, Input, Checkbox, Modal } from "antd";
import DicomCard from "_components/DicomCard/DicomCard";
import { StoreStateI, ExamIndexListI } from "_constants/interface";

import {
  MapStateToPropsI,
  HomePropsI,
  HomeStateI,
  ViewTypeEnum,
  SortTypeEnum,
  MapDispatchToPropsI,
  ListDescPropsI,
  TableDataI,
} from "./type";
import { submitExamIndexSearchAction } from "_actions/dicom";

import { Gutter } from "antd/lib/grid/row";
import { PaginationConfig, ColumnProps, TableEventListeners } from "antd/lib/table";
import LinkButton from "_components/LinkButton/LinkButton";

import emptyImg from "_images/empty.png";
import "./Home.less";

const DEFAULT_PAGE_SIZE = 12;

const ListDesc: FunctionComponent<ListDescPropsI> = (props): ReactElement => {
  const { desc, updateDesc } = props;

  const [inputValue, changeInputValue] = useState(desc || "");
  const [showEditor, editDesc] = useState(false);

  return (
    <>
      <span className={`dicom-list-desc-text`}>{desc}</span>
      <Icon
        className={`dicom-list-desc-edit iconfont`}
        type="edit"
        onClick={(e): void => {
          e.stopPropagation();
          editDesc(true);
        }}
      />
      <Input
        className={`dicom-list-desc-editor ${showEditor ? "dicom-list-desc-show" : ""}`}
        value={inputValue || ""}
        placeholder="备注"
        onClick={(e): void => e.stopPropagation()}
        onInput={(e): void => changeInputValue(e.currentTarget.value)}
        addonAfter={
          <div className="dicom-list-desc-ctl">
            <Icon
              className="iconfont icon_ic-complete"
              type="check-circle"
              onClick={(e): void => {
                e.stopPropagation();
                updateDesc && updateDesc(inputValue);
                editDesc(false);
              }}
            />
            <Icon
              type="close-circle"
              className="iconfont icon_ic-close"
              onClick={(e): void => {
                e.stopPropagation();
                editDesc(false);
              }}
            />
          </div>
        }
      ></Input>
    </>
  );
};

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
    const { getList } = this.props;
    getList && getList({ dtRange: [new Date(), new Date()], keyword: "" });
  }

  list = (): ReactElement | undefined => {
    const { selections, isSelectable, page } = this.state;
    const columns: ColumnProps<TableDataI>[] = [
      {
        title: "类型",
        dataIndex: "modality",
        render: (text: string, record): ReactElement | string => {
          const { id } = record;
          return isSelectable ? (
            <>
              <Checkbox value={id} checked={selections.indexOf(id) > -1}></Checkbox>
              <span>{text}</span>
            </>
          ) : (
            text
          );
        },
      },
      { title: "姓名", dataIndex: "patient_name" },
      { title: "上传日期", dataIndex: "study_date" },
      { title: "备注", dataIndex: "desc", className: "dicom-list-desc" },
    ];

    const dataSource: TableDataI[] = [];
    const renderList = this.getCurrentItem();

    renderList.forEach(data => {
      const { desc, ...others } = data;
      const editorDesc = (
        <ListDesc
          desc={desc}
          updateDesc={(value: string): void => this.updateDesc(others.id, value)}
        ></ListDesc>
      );
      dataSource.push({ ...others, desc: editorDesc });
    });

    const paginationConfig: PaginationConfig = {
      current: page,
      defaultPageSize: DEFAULT_PAGE_SIZE,
      total: renderList.length,
      hideOnSinglePage: true,
      onChange: (page): void => {
        this.setState({ page });
      },
    };

    return (
      <Table
        className="dicom-list dicom-list-table"
        rowKey={"id"}
        columns={columns}
        dataSource={dataSource}
        pagination={paginationConfig}
        onRow={(record): TableEventListeners => {
          return {
            onClick: (): void => {
              this.onClickItem(record.id);
            },
          };
        }}
      ></Table>
    );
  };

  dicoms = (): ReactElement | undefined => {
    const { page, isSelectable, selections } = this.state;
    const renderList = this.getCurrentItem();

    if (renderList && renderList.length) {
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
              checkbox={isSelectable}
              checked={selections.indexOf(id) > -1}
              onClick={(): void => this.onClickItem(id)}
              updateDesc={(value: string): void => this.updateDesc(id, value)}
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
            hideOnSinglePage={true}
            current={page}
            defaultPageSize={DEFAULT_PAGE_SIZE}
            total={renderList.length}
            onChange={(page): void => {
              this.setState({ page });
            }}
          ></Pagination>
        </div>
      );
    }
  };

  onClickItem = (id: string): void => {
    const { history, examIndexList } = this.props;
    const { isSelectable, selections } = this.state;

    if (isSelectable) {
      const nextSelections = selections.filter(item => item !== id);
      if (nextSelections.length === selections.length) {
        nextSelections.push(id);
      }
      this.setState({ selections: nextSelections });
    } else {
      const currentExam = examIndexList.find(item => item.id === id);
      if (currentExam) {
        const {
          id,
          patient_id,
          patient_name,
          birthday,
          sex,
          study_date,
          institution_name,
          modality,
        } = currentExam;
        history.push("/player", {
          id,
          patient_id,
          patient_name,
          birthday,
          sex,
          study_date,
          institution_name,
          modality,
        });
      }
    }
  };

  getCurrentItem = (): ExamIndexListI[] => {
    const { examIndexList } = this.props;
    const { page } = this.state;
    return examIndexList.slice((page - 1) * DEFAULT_PAGE_SIZE, page * DEFAULT_PAGE_SIZE);
  };

  controller = (): ReactElement => {
    const { examIndexList } = this.props;
    const { isSelectable, viewType } = this.state;
    return (
      <div id="controller" className={`controller`}>
        <div className="controller-left">
          <span className="controller-title">影像列表</span>
          <LinkButton className="controller-upload" to="/upload" icon="cloud-upload">
            上传
          </LinkButton>
          <div className={`controller-del ${isSelectable ? "controller-del-open" : ""}`}>
            <Icon
              className="iconfont"
              type={isSelectable ? "arrow-left" : "delete"}
              onClick={(): void => this.setState({ isSelectable: !isSelectable, selections: [] })}
            />
            <span onClick={this.selectedAll}>全选</span>
            <span onClick={this.showConfirm}>删除</span>
          </div>
        </div>
        <div className={`controller-right ${examIndexList.length ? "" : "hidden"}`}>
          <Dropdown overlay={this.dropdownContent()} placement="bottomRight">
            <Icon className="controller-select-sort iconfont" type="sort-ascending" />
          </Dropdown>
          <Icon
            className="controller-select-view iconfont"
            type={viewType === ViewTypeEnum.GRID ? "menu" : "appstore"}
            onClick={this.changeViewType}
          />
        </div>
      </div>
    );
  };

  selectedAll = (): void => {
    const currentItems = this.getCurrentItem();
    this.setState({
      selections:
        currentItems.length === this.state.selections.length
          ? []
          : currentItems.map(item => item.id),
    });
  };

  changeViewType = (): void => {
    const nextType =
      this.state.viewType === ViewTypeEnum.GRID ? ViewTypeEnum.LIST : ViewTypeEnum.GRID;
    this.setState({ viewType: nextType });
  };

  showConfirm = (): void => {
    Modal.confirm({
      centered: true,
      className: "del-confirm",
      title: "确认删除",
      content: "确认删除所选文件/文件夹吗？",
      cancelText: "取消",
      okText: "确定",
      onOk: async (): Promise<void> => {
        await this.delDicom();
        this.setState({
          isSelectable: false,
          selections: [],
        });
      },
      onCancel: (): void => {
        this.setState({
          isSelectable: false,
          selections: [],
        });
      },
    });
  };

  /**
   * 返回列表排序的内容部分
   *
   * @memberof Home
   */
  dropdownContent = (): ReactElement => {
    const { sortType } = this.state;
    return (
      <Menu
        className="home-dicom-sort"
        onClick={(data): void => {
          this.setState({ sortType: data.key as SortTypeEnum });
        }}
      >
        <Menu.Item disabled={sortType === SortTypeEnum.TIME} key={SortTypeEnum.TIME}>
          时间排序
        </Menu.Item>
        <Menu.Item disabled={sortType === SortTypeEnum.TYPE} key={SortTypeEnum.TYPE}>
          种类排序
        </Menu.Item>
      </Menu>
    );
  };

  /* === APIS 与服务器交互数据的方法 START === */

  /**
   * 更新指定dicom的desc
   *
   * @param {string} id dicom id
   * @param {string} value 更新的desc
   *
   * @memberof Home
   */
  updateDesc = (id: string, value: string): void => {
    console.log("update desc ", id, value);
  };

  /**
   * 删除所选dicom
   *
   * @memberof Home
   */
  delDicom = async (): Promise<void> => {
    const { selections } = this.state;
    console.log("del selected dicom: ", selections);
  };
  /* === APIS 与服务器交互数据的方法 END === */

  render(): ReactElement {
    const { examIndexList } = this.props;
    const { viewType } = this.state;

    return (
      <section className="home">
        {this.controller()}
        {examIndexList.length ? (
          viewType === ViewTypeEnum.GRID ? (
            this.dicoms()
          ) : (
            this.list()
          )
        ) : (
          <div className="home-empty">
            <img src={emptyImg} alt="no-dicom" />
          </div>
        )}
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
