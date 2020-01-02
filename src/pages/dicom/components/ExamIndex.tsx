import React from 'react';
import { IExamIndexList } from '../../../constants/interface';
import "./exam-index.less";

class ExamIndex extends React.Component <IExamIndexList, object> {
    render () {
        const { thumbnail } = this.props;
        return <div className="exam-index">
            <img src={thumbnail} alt="thumbnail"></img>
        </div>
    }
}

export default ExamIndex;