import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, render, direction, options}:
  {list: any[], render: Function, direction: string, options: Array<any>}) {

  console.log("List");

  const cn = bem('List');

  return (
    <div className={cn({[direction]: true})}>
      {Object.assign([], list).map(item => render(item, options?.find((opt: any) => opt.id === item.id)))}
    </div>
  );
}

export default React.memo(List);