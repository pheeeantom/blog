import React, { useCallback, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from './components/page-layout';
import { useFetchItemsQuery } from './store/services/items';
import { useSelector } from 'react-redux';
import List from './components/list';
import PostItem from './components/post-item';
import { Item } from './store/reducers/items';
import Spinner from './components/spinner';
import LoginForm from './components/login-form';
import RegistrationForm from './components/registration-form';
import Registration from './containers/registration';
import Login from './containers/login';
import Posts from './containers/Posts';

function App() {

    console.log("App");

    return (
        <Routes>
            <Route path={"/"} element={
                <PageLayout>
                    <Posts/>
                </PageLayout>
            }/>
            <Route path={"/login"} element={
                <PageLayout>
                    <Login/>
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