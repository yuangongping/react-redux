import React, { Component } from 'react';
import TableFilter from './components/TableFilter';

export default class MemberManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="member-manager-page">
        <TableFilter />
      </div>
    );
  }
}
