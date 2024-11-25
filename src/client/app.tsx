import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from './components/page-layout';
import { useFetchItemsQuery } from './store/services/items';
import { useDispatch, useSelector } from 'react-redux';
import List from './components/list';
import PostItem from './components/post-item';
import { Item } from './store/reducers/items';
import Spinner from './components/spinner';
import LoginForm from './components/login-form';
import RegistrationForm from './components/registration-form';
import Registration from './containers/registration';
import Login from './containers/login';
import Posts from './containers/Posts';
import { useFetchUserQuery } from './store/services/users';
import Nav from './components/nav';
import { setChangedLocalStorage } from './store/reducers/users';

function App() {

    console.log("App");

    const dispatch = useDispatch();

    /*const select = useSelector(state => ({
        changedLocalStorage: (state as any).usersReducer.changedLocalStorage,
    }));*/

    const changedLocalStorage = useSelector(state => (state as any).usersReducer.changedLocalStorage);
    const memoizedChangedLocalStorage = useMemo(() => {
        return changedLocalStorage;
    }, [changedLocalStorage]);

    const skip = useRef(true);

    const {data: user, error: errorUser, isLoading: isLoadingUser, isUninitialized} = useFetchUserQuery(memoizedChangedLocalStorage, {
        skip: skip.current
    });
    console.log(user, errorUser, isLoadingUser, isUninitialized);

    useEffect(() => {
        console.log('useEffect')
        skip.current = false;
        /*const timer = setTimeout(() => {
            skip.current = true;
        }, 1000);
        return () => clearTimeout(timer);*/
    }, [memoizedChangedLocalStorage]);

    useEffect(() => {
        dispatch(setChangedLocalStorage(changedLocalStorage + 1));
    }, []);

    /*useEffect(() => {
        if (!isUninitialized && !isLoadingUser) skip.current = true;
    }, [isLoadingUser, isUninitialized]);*/

    console.log(skip.current, memoizedChangedLocalStorage);

    const callbacks = {
        logout: useCallback(async () => {
            console.log('useCallback')
            localStorage.removeItem("token");
            //await loginReq({login: null, password: null});
            dispatch(setChangedLocalStorage(memoizedChangedLocalStorage + 1));
            //window.location.reload();
        }, [memoizedChangedLocalStorage, dispatch, setChangedLocalStorage]),
    };

    return (
        <Routes>
            <Route path={"/"} element={
                <PageLayout>
                    <Nav fetchedUser={{data: user, error: errorUser, isLoading: isLoadingUser, isUninitialized}}
                        logout={callbacks.logout}/>
                    <Posts create={true} byLogin={false} fetchedUser={{data: user, error: errorUser, isLoading: isLoadingUser, isUninitialized}}/>
                </PageLayout>
            }/>
            <Route path={"/login"} element={
                <PageLayout>
                    <Login fetchedUser={{data: user, error: errorUser, isLoading: isLoadingUser, isUninitialized}}
                        logout={callbacks.logout} />
                    {!errorUser && user ? <Posts create={false} byLogin={true} fetchedUser={{data: user, error: errorUser, isLoading: isLoadingUser, isUninitialized}}/> :
                        ''}
                </PageLayout>
            }/>
            <Route path={"/registrate"} element={
                <PageLayout>
                    <Registration/>
                </PageLayout>
            }/>
        </Routes>
    );
}

export default React.memo(App);