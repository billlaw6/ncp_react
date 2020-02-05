import React, { FC } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, RouteComponentProps } from "react-router-dom";
import ExamIndexTable from "./components/ExamIndexTable";
import { SearchFormI, StoreStateI } from "../../constants/interface";
import { Table, Input, Button, Icon } from "antd";
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";

declare interface PropsI {
  // 父项传进来的本模块的子路由
  routes?: Array<any>;
}

class Dicom extends React.Component<PropsI, object> {
  // constructor(props: PropsI) {
  //     super(props);
  //     console.log(props);
  // }

  render() {
    return (
      <>
        <ul>
          {this.props.routes!.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
        <Switch>
          {this.props.routes!.map((item: any, index: number) => {
            return <RouteWithSubRoutes key={index} {...item} />;
          })}
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state: StoreStateI) => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
});

export default connect(mapStateToProps)(Dicom);
