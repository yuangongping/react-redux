import React, { Component } from 'react';
import { Button, DatePicker, Select, Input, Dialog } from '@alifd/next';

import styles from './Filter.module.scss';

const is_coon_options = [
  { id: -1, value: '未打' },
  { id: 1, value: '拨打未接' },
  { id: 2, value: '拨打接通' },
  { id: 3, value: '无效资源' },
];

const device_options = [
  { id: 1, value: 'iPad' },
  { id: 2, value: 'Windows' },
  { id: 3, value: 'Mac' },
  { id: 0, value: '其他' },
];

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  componentWillMount() {
    this.props.memberModel();
  }

  render() {
    const {
      std,
      is_conn,
      create_time,
      exp_time,
      device,
      dialog,
      mobile,
      nickname,
    } = this.props;
    return (
      <div className={styles.tableFilter}>
        <Dialog
          visible={dialog}
          title="添加学生"
          onOk={this.props.addStd}
          onCancel={() => this.props.onChange('dialog', false)}
          onClose={() => this.props.onChange('dialog', false)}
          className={styles.memberManager}
        >
          <Input
            name="mobile"
            value={mobile}
            placeholder="请输入学员手机号"
            label="学生手机号"
            onChange={e => this.props.onChange('mobile', e)}
            trim
            hasClear
          />
          <Input
            name="nickname"
            value={nickname}
            placeholder="请输入学员昵称"
            label="学生昵称"
            onChange={e => this.props.onChange('nickname', e)}
            trim
            hasClear
          />
        </Dialog>
        <div className={styles.filterItem}>
          <Input
            name="std"
            value={std}
            placeholder="请输入学员ID/手机号"
            label="学生信息"
            onChange={e => this.props.onChange('std', e)}
            trim
            hasClear
          />
        </div>
        <div className={styles.filterItem}>
          <Select
            name="is_conn"
            value={is_conn}
            label="最近拨打状态"
            onChange={e => this.props.onChange('is_conn', e)}
            hasClear
          >
            {
              is_coon_options.map(({ id, value }) =>
                (<Select.Option value={id} key={id}>
                  {value}
                </Select.Option>))
            }
          </Select>
        </div>
        <div className={styles.filterItem}>
          <DatePicker.RangePicker
            name="create_time"
            value={create_time}
            label="注册时间"
            format="YYYY-MM-DD"
            onChange={e => this.props.onChange('create_time', e)}
            hasClear
          />
        </div>
        <div className={styles.filterItem}>
          <DatePicker.RangePicker
            name="exp_time"
            value={exp_time}
            label="预约课时间"
            format="YYYY-MM-DD"
            onChange={e => this.props.onChange('exp_time', e)}
            hasClear
          />
        </div>
        <div className={styles.filterItem}>
          <Select
            name="device"
            value={device}
            label="设备类型"
            onChange={e => this.props.onChange('device', e)}
            hasClear
          >
            {
              device_options.map(({ id, value }) =>
              (<Select.Option value={id} key={id}>
                {value}
              </Select.Option>))
            }
          </Select>
        </div>
        <div className="spacer" />
        <Button type="primary" className={styles.submitBotton} onClick={this.props.memberList}>
          查询
        </Button>
        <Button type="primary" className={styles.submitBotton} onClick={() => this.props.onChange('dialog', !dialog)}>
          导入
        </Button>
      </div>
    );
  }
}
