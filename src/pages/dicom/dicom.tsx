import React, { FC } from 'react';
import { createContext } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { DicomInfoSearchForm, ResizableTitle, DicomInfoTable } from './components/DicomManage';
import { IDicomInfo, IDicomSearchState, IStoreState, IRoute } from '../../constants';
import {
    dicomSearchRequstedAction,
    dicomSearchSucceededAction,
    dicomSearchFailedAction,
} from '../../store/actions/dicom';
import { Table, Input, Button, Icon } from 'antd';
import DicomViewer from './components/DicomViewer';
import DicomUploader from './components/DicomUploader';


function RouteWithSubRoutes(route: any) {
    return (
        <Route
            path={route.path}
            render={(props) => {
                // pass the sub-routes down to keep nesting
                return <route.component {...props} routes={route.routes} />
            }}
        />
    )
}

declare interface IProps {
    routes?: Array<IRoute>;
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
                    <Route key="viewer" path="/dicom/viewer" components={DicomViewer} />
                    <Route key="uploader" path="/dicom/uploader" components={DicomUploader} />
                </Switch>
            </>
        )
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Dicom);
export default Dicom;