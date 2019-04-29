import React from 'react';
import Loadable from 'react-loadable';
import { Loading } from '@alifd/next';

/**
 * @EXAMPLE
 * 骨架屏 loader
*/
export default Loadable({
  loader: () => import(/* webpackChunkName: "BasicLayout" */ './BasicLayout'),
  loading: () => <Loading className="fit-content" />,
});
