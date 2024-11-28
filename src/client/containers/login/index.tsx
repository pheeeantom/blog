import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useFetchUserQuery, useLoginMutation } from "../../store/services/users";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setChangedLocalStorage } from "../../store/reducers/users";
import LoginForm from "../../components/login-form";
import Spinner from "../../components/spinner";
import Cabinet from "../../components/cabinet";
import { setParams } from "../../store/reducers/items";

function Login({fetchedUser, logout}: Readonly<{fetchedUser: any, logout: Function}>) {

  console.log("Login");

  const dispatch = useDispatch();

  //const skip = useRef(true);

  /*const select = useSelector((state) => ({
    changedLocalStorage: (state as any).usersReducer.changedLocalStorage,
  }));*/
  const changedLocalStorage = useSelector(state => (state as any).usersReducer.changedLocalStorage);
  const memoizedChangedLocalStorage = useMemo(() => {
    return changedLocalStorage;
  }, [changedLocalStorage]);

  const [loginReq, result] = useLoginMutation();
  const [error, setError] = useState('');
  /*const {data: user, error: errorUser, isLoading: isLoadingUser, isUninitialized} = useFetchUserQuery(select.changedLocalStorage, {
    skip: skip.current
  });
  console.log(user, errorUser, isLoadingUser, isUninitialized);

  useEffect(() => {
    skip.current = false;
  }, [select.changedLocalStorage]);

  console.log(skip.current, select.changedLocalStorage);*/

  const callbacks = {
    login: useCallback(async () => {
      try {
        let temp = await loginReq({
          login: (document.getElementById('login') as HTMLInputElement).value,
          password: (document.getElementById('password') as HTMLInputElement).value
        }).unwrap();
        console.log(temp);
        localStorage.setItem("token", temp.token);
        dispatch(setChangedLocalStorage(memoizedChangedLocalStorage + 1));
        setError(null);
        //window.location.reload();
      } catch (e) {
        setError(e.data.message);
      }
    }, [loginReq, dispatch, setChangedLocalStorage, memoizedChangedLocalStorage]),
  };

  /*useEffect(() => {
    if (fetchedUser.data)
      dispatch(setParams({
        start: '0',
        limit: '2',
        sort: 'likes',
        login: fetchedUser.data.login,
      }));
  }, [fetchedUser.data]);*/

  return (
    <Spinner active={fetchedUser.isLoading || fetchedUser.isUninitialized}>
      <>
        {!fetchedUser.error && fetchedUser.data ?
          <Cabinet user={fetchedUser.data} logout={logout}/> : <LoginForm login={callbacks.login} error={error}/>}
        </>
    </Spinner>
  );
}

export default React.memo(Login);