import React, { FC } from 'react';
import { createContext } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { DicomInfoSearchForm, ResizableTitle, DicomInfoTable } from './components/DicomManage';
import { IDicomInfo, IDicomSearchState, IStoreState, } from '../../constants/interface';
import {
    dicomSearchRequstedAction,
    dicomSearchSucceededAction,
    dicomSearchFailedAction,
} from '../../store/actions/dicom';
import { Table, Input, Button, Icon } from 'antd';
import DicomViewer from './components/DicomViewer';
import DicomUploader from './components/DicomUploader';
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes';


declare interface IProps {
    routes?: Array<any>;
}

class Dicom extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <>
                <ul>
                    <li>
                        <Link to="/dicom/viewer">viewer</Link>
                    </li>
                    <li>
                        <Link to="/dicom/uploader">uploader</Link>
                    </li>
                </ul>
                <Switch>
                    <h3>Dicom Content</h3>
                    {this.props.routes!.map((item: any, index: number) => {
                        return <RouteWithSubRoutes key={index} {...item} />
                    })}
                </Switch>
            </>
        )
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Dicom);
export default Dicom;