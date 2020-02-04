import React from "react";
import { StoreStateI, ProfileFormI } from "../../constants/interface";
import { connect } from "react-redux";
import { setCurrentUserAction, updateUserInfoAction } from "../../store/actions/user";
import ProfileForm from "./components/ProfileForm";

const mapStateToProps = (state: StoreStateI) => {
  return {
    currentUser: state.currentUser,
    profileForm: state.profileForm,
  };
};
const mapDispatchToProps = {
  setCurrentUserAction,
  updateUserInfoAction,
};

type PropsI = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Profile extends React.Component<PropsI, any> {
  // constructor(props: PropsI) {
  //   super(props);
  //   this.state = {
  //     fields: {
  //       gender: {
  //         value: props.profileForm.gender,
  //       },
  //       birthday: {
  //         value: props.profileForm.birthday,
  //       },
  //       sign: {
  //         value: props.profileForm.sign,
  //       },
  //       address: {
  //         value: props.profileForm.address,
  //       },
  //       username: {
  //         value: props.profileForm.username,
  //       },
  //       unit: {
  //         value: props.profileForm.unit,
  //       },
  //       cellPhone: {
  //         value: props.profileForm.cell_phone,
  //       },
  //     },
  //   };
  // }
  // handleFormChange = (changedValues: ProfileFormI) => {};

  // handleFormSubmit = (submitedFormData: ProfileFormI) => {
  //   // this.props.updateUserInfoAction(submitedFormData);
  //   console.log(submitedFormData);
  // };

  // render() {
  //   const currentUser = this.props.currentUser;
  //   const { fields } = this.state;
  //   return (
  //     <div>
  //       个人信息编辑
  //       {currentUser.token}
  //       <ProfileForm
  //         fields={fields}
  //         onChange={this.handleFormChange}
  //         onSubmit={this.handleFormSubmit}
  //       />
  //     </div>
  //   );
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
