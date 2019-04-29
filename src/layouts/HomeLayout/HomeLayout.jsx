import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routerData } from '../../routerConfig';

export default class HomeLayout extends Component {
  static displayName = 'HomeLayout';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout className="home-layout">
        <Layout.Section scrollable>
          <Layout.Header>
            <div className="brand">
              <svg className="icon logo" aria-hidden="true">
                <use xlinkHref="#icon-logo1" />
              </svg>
            </div>
          </Layout.Header>
          <Layout.Main>
            <Switch>
              {routerData.map((item, index) => {
                return item.component ? (
                  <Route
                    key={index}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                ) : null;
              })}
              <Redirect exact from="/home" to="/home/main" />
            </Switch>
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
