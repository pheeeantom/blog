import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CreatePostItem({post}: {post: Function}) {

  console.log("CreatePostItem");

  const cn = bem('CreatePostItem');

  return (
    <div className={cn()}>
        <form onSubmit={async (e) => {
            e.preventDefault();
            post();
        }}>

            <div className={cn('field', {center: true})}>
                <h1>ЗАПОСТИТЬ</h1>
            </div>
            <div className={cn('field')}>
                <label htmlFor="header">Заголовок:</label>
                <input id="header" type="text" name="header" />
            </div>
            <div className={cn('field')}>
                <label htmlFor="text">Текст:</label>
                <textarea id="text" name="text"></textarea>
            </div>
            <div className={cn('field')}>
                <label htmlFor="pic">Картинка:</label>
                <input id="pic" type="file" />
            </div>
            <div className={cn('field', {center: true})}>
                <input type="submit" value="Отправить"/>
            </div>
        </form>
    </div>
  );
}

export default React.memo(CreatePostItem);