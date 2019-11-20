import React from 'react';
import DicomManage from './components/DicomManage';

type IState = {
    fields: {
        dtRange: Array<Date>;
        keyword: string;
        status: string; 
    }
}

class Dicom extends React.Component<object, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: {
                dtRange: [new Date((new Date().getTime() - 3 * 24 * 3600 * 1000)), new Date()],
                keyword: '',
                status: '',
            }
        }
    }
    render () {
        return (
            <>
            <DicomManage />
            </>
        )
    }
}

export default Dicom;