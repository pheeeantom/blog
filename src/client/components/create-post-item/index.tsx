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
            const newPost = new FormData();
            const file = (document.getElementById('pic') as HTMLInputElement).files[0];
            newPost.append("file", file);
            newPost.append("pic", file.name);
            newPost.append("header", (document.getElementById('header') as HTMLInputElement).value);
            newPost.append("text", (document.getElementById('text') as HTMLInputElement).value);
            post(newPost);
        }}>
            <h1>ЗАПОСТИТЬ</h1>
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
            <input type="submit" value="Отправить"/>
        </form>
    </div>
  );
}

export default React.memo(CreatePostItem);