import React from 'react';

import styles from './layout.module.less';
import './layout.less';
import BrandedHeader from './BrandedHeader.js';
import BrandedFooter from './BrandedFooter.js';

export default function Layout({ children }) {
  // eslint-disable-next-line react/prop-types
  return (
    <div className={styles.container}>
      <BrandedHeader />
      <div className={styles.mainWrap}>
        <main className={styles.main}>{children}</main>
      </div>
      <BrandedFooter />
    </div>
  );
}
