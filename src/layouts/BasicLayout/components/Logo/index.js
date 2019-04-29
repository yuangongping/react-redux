import React, { PureComponent } from 'react';
import './index.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <svg className="icon pointer" aria-hidden="true">
          <use xlinkHref="#icon-logo1" />
        </svg>
      </div>
    );
  }
}
