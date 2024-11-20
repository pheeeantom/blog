import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Item } from "../../store/reducers/items";

function PostItem({item, options}:
    Readonly<{item: Item, options: null}>) {

  console.log("PostItem");

  const cn = bem('PostItem');

  return (
    <div className={cn()}>
      {item.header}
    </div>
  );
}

export default React.memo(PostItem);