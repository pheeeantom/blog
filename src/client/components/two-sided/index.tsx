import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function TwoSided({left, right}:
                      Readonly<{left?: React.ReactNode, right?: React.ReactNode}>) {

    console.log("TwoSided");

    const cn = bem('TwoSided');

    return (
        <div className={cn()}>
            <div className={cn('left')}>
                {left}
            </div>
            <div className={cn('right')}>
                {right}
            </div>
        </div>
    );
}

export default React.memo(TwoSided);