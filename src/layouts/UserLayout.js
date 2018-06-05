import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.png';
import { getRoutes } from '../utils/utils';
import config from '../config/config';

const copyright = (
  <Fragment>
    FES Toolbox Platform <Icon type="copyright" /> 2018 Wangsu
  </Fragment>
);

class UserLayout extends React.PureComponent {
  getPageTitle() {
    let title = '';
    const { routerData, location } = this.props;
    const { pathname } = location;
    const { topTitle } = config;

    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${topTitle}`;
    }
    return title;
  }

  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>{config.topTitle}</span>
                </Link>
              </div>
              <div className={styles.desc}>网宿产品部 - 研发三部 - FES 组 - 自动化工具平台</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
