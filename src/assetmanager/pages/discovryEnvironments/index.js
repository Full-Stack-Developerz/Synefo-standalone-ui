import React, { Component } from "react";
import { Link } from "react-router-dom";
import Wizard from "./Wizard";
import OperationMode from "./OperationMode";
import PreparePolicy from "./PreparePolicy";
import CreateRole from "./CreateRole";
import AssociateOU from "./AssociateOU";
import Finish from "./Finish";

class DiscovryEnvironments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationList: null,
      selection: [],
      name: "",
      accessKey: "",
      secretKey: "",
    };
    this.roleRef = React.createRef();
    this.ouRef = React.createRef();
    this.wizardRef = React.createRef();
    this.reviewRef = React.createRef();
    this.steps = [
      {
        name: "Operation Mode",
        component: () => <OperationMode />,
      },
      {
        name: "Prepare Policy",
        component: () => <PreparePolicy />,
      },
      {
        name: "Create Role",
        component: () => (
          <CreateRole ref={this.roleRef} onChangeInput={this.onChangeInput} />
        ),
      },
      {
        name: "Associate OU",
        component: () => (
          <AssociateOU
            ref={this.ouRef}
            onChangeSelection={this.onChangeSelection}
            organizationList={this.state.organizationList}
            getOrganizationList={this.getOrganizationList}
            meta={props.meta}
          />
        ),
      },
      {
        name: "Finish",
        component: () => (
          <Finish
            ref={this.reviewRef}
            selectedOrg={
              this.ouRef.current !== null
                ? this.ouRef.current.getSelection()
                : null
            }
            selectedData={
              this.roleRef.current !== null
                ? this.roleRef.current.getRoleData()
                : null
            }
          />
        ),
      },
    ];
  }

  onChangeSelection = (selection) => {
    this.setState({
      selection,
    });
  };
  
  onChangeInput = (name, accessKey, secretKey) => {
    this.setState({
      name,
      accessKey,
      secretKey,
    });
  };

  getSelectedData = () => {
    return {
      name: this.state.name,
      accessKey: this.state.accessKey,
      secretKey: this.state.secretKey,
    };
  };

  // onSubmit = () => {
  //     const selectionData = this.ouRef.current.getSelection();
  //     const roleData = this.roleRef.current.getRoleData();
  //     if (!roleData.isValid) {
  //         this.wizardRef.current.setActiveStep(2);
  //     } else if (!selectionData[0] || !selectionData[1]) {
  //         this.wizardRef.current.setActiveStep(3);
  //     } else {
  //         const sendData = {
  //             "name": roleData.displayName,
  //             "accessKey": roleData.accessKey,
  //             "secretKey": roleData.secretKey,
  //             "accountId": roleData.accountId,
  //             "orgId": selectionData[0],
  //             "ouId": selectionData[1]
  //         };
  //         RestService.add(this.config.ADD_ACCOUNT, sendData).then(
  //             (response) => {
  //                 alert("Account created")
  //             });
  //     }
  // }

  async componentDidMount() {
    try {
      var usr = localStorage.getItem(`userInfo`);
      if (usr !== null) {
        const user = JSON.parse(usr);
        // await RestService.getData(this.config.GET_USER_ORGANIZATION + '/' + user.info.credentials.name, null, null).then(
        //     (response) => {
        //         this.setState({
        //             organizationList: response,
        //         });
        //     });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  getOrganizationList = () => {
    var usr = localStorage.getItem(`userInfo`);

    if (usr !== null) {
      const user = JSON.parse(usr);
      // RestService.getData(this.config.GET_USER_ORGANIZATION + '/' + user.info.credentials.name, null, null).then(
      //     (response) => {
      //         this.setState({
      //             organizationList: response,
      //         });
      //     });
    }
  };
  
  render() {
    return (
      <div className="asset-container">
        <div className="accountsetup-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Environments</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn ">
                  <Link
                    to={`/assetmanager/pages/environments`}
                    className="asset-white-button min-width-inherit m-r-0"
                  >
                    <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp; Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container">
            <Wizard ref={this.wizardRef} steps={this.steps} />
          </div>
        </div>
      </div>
    );
  }
}

export default DiscovryEnvironments;
