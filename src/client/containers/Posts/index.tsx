import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../../components/post-item";
import { Item, setParams } from "../../store/reducers/items";
import List from "../../components/list";
import { useCreateItemMutation, useFetchItemsQuery, useLikeMutation } from "../../store/services/items";
import Spinner from "../../components/spinner";
import CreatePostItem from "../../components/create-post-item";
import Nav from "../../components/nav";
import { useFetchUserQuery } from "../../store/services/users";
import ParamsItems from "../../components/params-items";
import Pagination from "../../components/pagination";

function Posts({fetchedUser}: Readonly<{fetchedUser: any}>) {
    console.log('Posts');

    const dispatch = useDispatch();

    const params = useSelector(state => (state as any).itemsReducer.params);
    const memoizedParams = useMemo(() => {
        return params;
    }, [params]);

    const {data: items, error: errorItems, isLoading: isLoadingItems} = useFetchItemsQuery({...memoizedParams, changedUserTag: fetchedUser.data, changedUserErrorTag: fetchedUser.error}, {
        skip: !fetchedUser.data
    });
    console.log(items, errorItems, isLoadingItems);

    const [postReq, result] = useCreateItemMutation();

    const [likeReq, result2] = useLikeMutation();

    const callbacks = {
        post: useCallback(async (newPost: FormData) => {
            try {
                let temp = await postReq(newPost).unwrap();
                console.log(temp);
            } catch (e) {
                console.log(e);
            }
        }, [postReq]),
        like: useCallback((id: number) => {
            likeReq({id});
        }, []),
        setParam: useCallback((param: any) => {
            console.log(1111);
            dispatch(setParams({...memoizedParams, ...param}));
        }, [dispatch, setParams, memoizedParams]),
    };

    const renders = {
        post: useCallback((item: Item) => (
            <PostItem key={item.id} item={item} options={null} like={callbacks.like}/>
        ), []),
    };

    return (
        <Spinner active={isLoadingItems}>
            {!fetchedUser.error && fetchedUser.data ? <CreatePostItem post={callbacks.post}/> : ''}
            <ParamsItems setParam={callbacks.setParam} sort={memoizedParams.sort} />
            {errorItems ? <div>{(errorItems as any).data.message}</div> :
                <List list={items?.data} render={renders.post} direction={'vertical'} options={null}/>}
            <Pagination setParam={callbacks.setParam} start={+memoizedParams.start} limit={+memoizedParams.limit} amount={items?.amount}/>
        </Spinner>
    );
}

export default React.memo(Posts);