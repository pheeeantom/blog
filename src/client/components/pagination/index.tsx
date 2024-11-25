import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination({setParam, start, limit, amount}: {setParam: Function, start: number, limit: number, amount: number}) {

  console.log("Pagination");

  const cn = bem('Pagination');

  return (
    <div className={cn()}>
        <button onClick={() => {
            setParam({start: start - limit < 0 ? start : start - limit})
        }}>🠈</button>
        {start - limit < 0 ? '' : '... '}
        {(start / limit) + 1}
        {amount - start > limit ? ' ...' : ''}
        <button onClick={() => {
            setParam({start: amount - start > limit ? start + limit : start})
        }}>🠊</button>
    </div>
  );
}

export default React.memo(Pagination);