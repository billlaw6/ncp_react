import React from 'react';
import { IStoreState } from '../../constants/interface';
import { connect } from 'react-redux';
import { setCurrentUserAction } from '../../store/actions/user';


const mapStateToProps = (state: IStoreState) => {
    return {
        currentUser: state.currentUser,
    }
}
const mapDispatchToProps = {
    setCurrentUserAction,
}

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Profile extends React.Component <IProps, any> {
    render () {
        const currentUser = this.props.currentUser;
        return <div>
            个人信息编辑
            {currentUser.token}
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);