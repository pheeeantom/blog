import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../../components/post-item";
import { Item, ItemsParams, setParams } from "../../store/reducers/items";
import List from "../../components/list";
import { useCreateItemMutation, useDeleteItemMutation, useFetchItemsQuery, useLikeMutation } from "../../store/services/items";
import Spinner from "../../components/spinner";
import CreatePostItem from "../../components/create-post-item";
import Nav from "../../components/nav";
import { useFetchUserQuery } from "../../store/services/users";
import ParamsItems from "../../components/params-items";
import Pagination from "../../components/pagination";
import { useLocation } from "react-router-dom";

function Posts({fetchedUser, create, byLogin}: Readonly<{fetchedUser: any, create: boolean, byLogin: boolean}>) {
    console.log('Posts');

    const dispatch = useDispatch();

    const params = useSelector(state => (state as any).itemsReducer.params);
    const memoizedParams = useMemo(() => {
        console.log('params:', params);
        return params;
    }, [params]);

    const skip = useRef(true);

    const {data: items, error: errorItems, isLoading: isLoadingItems} = useFetchItemsQuery(memoizedParams/*, changedUserTag: fetchedUser.data, changedUserErrorTag: fetchedUser.error*/, {
        skip: skip.current
    });
    console.log(items, errorItems, isLoadingItems);

    const [postReq, result] = useCreateItemMutation();
    const [deleteReq, result3] = useDeleteItemMutation();

    const [likeReq, result2] = useLikeMutation();

    const location = useLocation();

    useEffect(() => {
        console.log(fetchedUser);
        dispatch(setParams({
            start: '0',
            limit: '2',
            sort: 'likes',
            login: byLogin && !fetchedUser.error ? fetchedUser.data.login : '',
            updated: (+memoizedParams.updated + 1).toString(),
        }));
        skip.current = false;
        //setTimeout(() => { skip.current = true; }, 1000);
    }, [location, fetchedUser.data, fetchedUser.error]);

    /*useEffect(() => {
        dispatch(setParams({...memoizedParams, login: byLogin ? fetchedUser.data.login : '', start: '0'}));
        skip.current = false;
    }, [byLogin]);*/

    const callbacks = {
        post: useCallback(async (newPost: FormData) => {
            try {
                let temp = await postReq(newPost).unwrap();
                dispatch(setParams({...memoizedParams, ...{start: '0', sort: 'date', login: !byLogin ? '' : memoizedParams.login}, updated: (+memoizedParams.updated + 1).toString()}));
                console.log(temp);
            } catch (e) {
                alert(e.data.message);
            }
        }, [dispatch, setParams, postReq, byLogin, memoizedParams]),
        delete: useCallback(async (id: number) => {
            try {
                let temp = await deleteReq(id).unwrap();
                dispatch(setParams({...memoizedParams, ...{start: '0', sort: 'date', login: !byLogin ? '' : memoizedParams.login}, updated: (+memoizedParams.updated + 1).toString()}));
                console.log(temp);
            } catch (e) {
                alert(e.data.message);
            }
        }, [dispatch, setParams, deleteReq, byLogin, memoizedParams]),
        like: useCallback(async (id: number) => {
            try {
                let temp = await likeReq({id}).unwrap();
                dispatch(setParams({...memoizedParams, updated: (+memoizedParams.updated + 1).toString()}));
                console.log(temp);
            } catch (e) {
                alert(e.data.message);
            }
        }, [dispatch, setParams, likeReq, memoizedParams]),
        setParam: useCallback((param: any) => {
            console.log(1111);
            dispatch(setParams({...memoizedParams, ...param}));
        }, [dispatch, setParams, memoizedParams]),
        reset: useCallback(() => {
            let newParam: ItemsParams = {
                start: '0',
                limit: '2',
                sort: 'likes',
                login: !byLogin ? '' : memoizedParams.login,
                updated: (+memoizedParams.updated + 1).toString(),
            };
            dispatch(setParams(newParam));
        }, [dispatch, setParams, memoizedParams, byLogin])
    };

    const renders = {
        post: useCallback((item: Item) => (
            <PostItem key={item.id} item={item} options={null} like={callbacks.like} deleteItem={byLogin ? callbacks.delete : null} setParam={callbacks.setParam} />
        ), [callbacks.like, callbacks.delete, callbacks.setParam]),
    };

    return (
        <Spinner active={isLoadingItems}>
            {!fetchedUser.error && fetchedUser.data && create ? <CreatePostItem post={callbacks.post}/> : ''}
            <ParamsItems setParam={callbacks.setParam} sort={memoizedParams.sort} reset={callbacks.reset} />
            {errorItems ? <div>{(errorItems as any).data.message}</div> :
                <List list={items?.data} render={renders.post} direction={'vertical'} options={null}/>}
            {!items || !items.amount ? <div style={{textAlign: 'center', color: 'gray', margin: '20px 0'}}>Пусто</div> :
                <Pagination setParam={callbacks.setParam} start={+memoizedParams.start} limit={+memoizedParams.limit} amount={items?.amount}/>}
        </Spinner>
    );
}

export default React.memo(Posts);