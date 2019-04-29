import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from '../../utils/injectReducer';
import profileReducer from '../../store/userProfile/reducer';
import logoutReducer from '../../store/userLogout/reducer';
import { userProfile } from '../../store/userProfile/action';
import { userLogout } from '../../store/userLogout/action';

const BasicLayoutHoc = (WrappedComponent) => {
  @compose(injectReducer({
    key: 'logout',
    reducer: logoutReducer,
  }), injectReducer({
    key: 'profile',
    reducer: profileReducer,
  }))
  @connect(store => store, { userLogout, userProfile })
  class Container extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.userProfile();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Container;
};

export default BasicLayoutHoc;
