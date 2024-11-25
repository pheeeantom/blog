import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Item } from "../../store/reducers/items";

function PostItem({item, like, options}:
    Readonly<{item: Item, like: Function, options: null}>) {

  console.log("PostItem");

  const cn = bem('PostItem');

  return (
    <div className={cn()}>
      <div className={cn('center')}>
        <div className={cn('left')}>
          <img src={`/${item.author}/pics/${item.pic}`} />
        </div>
        <div className={cn('right')}>
          <h3>{item.header}{item.isLiked !== null ? <><button style={{color: (item.isLiked ? 'red' : 'green')}} onClick={() => {
            like(item.id);
          }}>{item.isLiked ? '⯆' : '⯅'}</button>{item.likes ?? '0'}</> : ''}</h3>
          <p>{item.text}</p>
          <p className={cn('author', {muted: true})}>{item.author}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostItem);