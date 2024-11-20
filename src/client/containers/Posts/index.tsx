import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import PostItem from "../../components/post-item";
import { Item } from "../../store/reducers/items";
import List from "../../components/list";
import { useCreateItemMutation, useFetchItemsQuery } from "../../store/services/items";
import Spinner from "../../components/spinner";
import CreatePostItem from "../../components/create-post-item";

function Posts() {
    console.log('Posts');

    const select = useSelector(state => ({
        params: (state as any).itemsReducer.params,
    }));

    const {data: items, error: errorItems, isLoading: isLoadingItems} = useFetchItemsQuery(select.params);

    const renders = {
        post: useCallback((item: Item) => (
            <PostItem key={item.id} item={item} options={null}/>
        ), []),
    };

    const [postReq, result] = useCreateItemMutation();

    const callbacks = {
        post: useCallback(async () => {
            const newPost = new FormData();
            const file = (document.getElementById('pic') as HTMLInputElement).files[0];
            newPost.append("file", file);
            newPost.append("pic", file.name);
            newPost.append("header", (document.getElementById('header') as HTMLInputElement).value);
            newPost.append("text", (document.getElementById('text') as HTMLInputElement).value);
            try {
                let temp = await postReq(newPost).unwrap();
                console.log(temp);
            } catch (e) {
                console.log(e);
            }
        }, [postReq]),
    };

    return (
        <Spinner active={isLoadingItems}>
            <CreatePostItem post={callbacks.post}/>
            {errorItems ? <div>{(errorItems as any).data.message}</div> :
                <List list={items} render={renders.post} direction={'vertical'} options={null}/>}
        </Spinner>
    );
}

export default React.memo(Posts);