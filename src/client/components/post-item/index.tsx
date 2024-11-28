import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Item } from "../../store/reducers/items";

function PostItem({item, like, setParam, deleteItem, options}:
    Readonly<{item: Item, like: Function, setParam: Function, deleteItem: Function, options: null}>) {

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
          {deleteItem ? <p><button onClick={() => {
            deleteItem(item.id);
          }}>Удалить</button></p> : ''}
          <p>{item.text}</p>
          <p className={cn('author', {muted: true})} onClick={() => setParam({login: item.author, start: '0'})}>{item.author}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostItem);