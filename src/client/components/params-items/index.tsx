import React, { useEffect, useRef } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ParamsItems({sort, setParam}: {sort: string, setParam: Function}) {

  console.log("ParamsItems");

  const cn = bem('ParamsItems');

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    selectRef.current.value = sort;
  }, [selectRef]);

  return (
    <div className={cn()}>
        <select ref={selectRef} onChange={(e) => {
            setParam({sort: (e.target as HTMLSelectElement).options[(e.target as HTMLSelectElement).selectedIndex].
                value});
        }}>
            <option value={'date'}>Сортировать по дате</option>
            <option value={'likes'}>Сортировать по лайкам</option>
        </select>
    </div>
  );
}

export default React.memo(ParamsItems);