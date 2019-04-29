import React, { Component } from 'react';
import { Table, Pagination, Button, Dropdown, Menu, Loading, Icon } from '@alifd/next';

import './CustomTable.scss';

export default class Home extends Component {
  static displayName = 'Home';

  qiyuCall = call_number => {
    window.qiConnect.call(call_number);
  }

  renderIcon = call_number => {
    return (
      <svg className="icon pointer" aria-hidden="true" onClick={() => this.qiyuCall(call_number)}>
        <use xlinkHref="#icon-call" />
      </svg>
    );
  }

  renderOper = (token, index, record) => {
    return (
      <div className="split">
        <Dropdown
          trigger={
            <Button text>
              {Number.isFinite(record.exp_difficulty)
              ? this.props.exp_difficultys.find(exp_difficulty => exp_difficulty.id === record.exp_difficulty).value
              : '选择级别'}
              <Icon type="arrow-down" />
            </Button>}
          triggerType="click"
          align="tr br"
        >
          <Menu onItemClick={(key) => this.props.setMemberExp_difficulty(key, record)}>
            {
              this.props.exp_difficultys.map(({ value, id }) =>
                <Menu.Item key={id} disabled={id === record.exp_difficulty}>{value}</Menu.Item>)
            }
          </Menu>
        </Dropdown>
        <Button text component="a" target="_blank" href={`${process.env.NODE_ENV === 'development' ? 'http://www.test.com' : 'https://www.landi.com'}/Member/Test/reserve/f/2?outsource=${token}`}>约体验课</Button>
        <Button text component="a" target="_blank" href={`${process.env.NODE_ENV === 'development' ? 'http://www.test.com' : 'https://www.landi.com'}/Member/Course/index?outsource=${token}`}>下单</Button>
      </div>
    );
  };

  renderSplit = timerange => {
    return timerange.length ?
      <div className="columns">
        {
          timerange.map(time => <div className="row" key={time}>{time}</div>)
        }
      </div> :
      '';
  }

  render() {
    const { list, total, loading } = this.props;
    /* eslint-disable */
    return (
      <div id="tableContainer">
        <Table
          dataSource={list}
          hasBorder={false}
          loading={loading}
          className="custom-table"
        >
          <Table.Column title="学生" dataIndex="sname" align="center" />
          <Table.Column title="手机号" dataIndex="mobile" align="center" />
          <Table.Column title="七鱼呼叫" dataIndex="call_number" cell={this.renderIcon} align="center" />
          <Table.Column title="最近拨打状态" dataIndex="conn_show" align="center" />
          <Table.Column title="最近拨打时间" dataIndex="last_dial_up" align="center" />
          <Table.Column title="注册时间" dataIndex="create_time_show" align="center" />
          <Table.Column title="预约课时间" dataIndex="ty_lsn_time" cell={this.renderSplit} align="center" />
          <Table.Column title="设备类型" dataIndex="device" align="center" />
          <Table.Column title="操作" dataIndex="token" cell={this.renderOper} align="center" />
        </Table>
        <Pagination className="pagination"
          pageSize={20}
          current={this.props.current}
          onChange={this.props.handlePagination}
          total={total}
        />
      </div>
    );
  }
}
