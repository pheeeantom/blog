import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({children}: Readonly<{children: React.ReactNode}>) {

  console.log("PageLayout");

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('center')}>
        {children}
      </div>
    </div>
  );
}

export default React.memo(PageLayout);