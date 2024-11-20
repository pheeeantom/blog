import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useFetchUserQuery, useLoginMutation } from "../../store/services/users";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setChangedLocalStorage } from "../../store/reducers/users";
import LoginForm from "../../components/login-form";
import Spinner from "../../components/spinner";

function Login() {

  console.log("Login");

  const dispatch = useDispatch();

  const skip = useRef(true);

  const select = useSelector((state) => ({
    changedLocalStorage: (state as any).usersReducer.changedLocalStorage,
  }));

  const [loginReq, result] = useLoginMutation();
  const [error, setError] = useState('');
  const {data: user, error: errorUser, isLoading: isLoadingUser, isUninitialized} = useFetchUserQuery(select.changedLocalStorage, {
    skip: skip.current
  });
  console.log(user, errorUser, isLoadingUser, isUninitialized);

  useEffect(() => {
    skip.current = false;
  }, [select.changedLocalStorage]);

  console.log(skip.current, select.changedLocalStorage);

  const callbacks = {
    login: useCallback(async () => {
      try {
        let temp = await loginReq({
          login: (document.getElementById('login') as HTMLInputElement).value,
          password: (document.getElementById('password') as HTMLInputElement).value
        }).unwrap();
        console.log(temp);
        localStorage.setItem("token", temp.token);
        dispatch(setChangedLocalStorage(select.changedLocalStorage + 1));
        setError(null);
        //window.location.reload();
      } catch (e) {
        setError(e.data.message);
      }
    }, [loginReq, dispatch, setChangedLocalStorage, select.changedLocalStorage]),
  };

  return (
    <Spinner active={isLoadingUser || isUninitialized}>
      <>
        {!errorUser && user ?
          <div>
            <span>{user.login}</span>
            <span><button onClick={async () => {
              localStorage.removeItem("token");
              //await loginReq({login: null, password: null});
              dispatch(setChangedLocalStorage(select.changedLocalStorage + 1));
              //window.location.reload();
            }}>Выйти</button></span>
          </div> : <LoginForm login={callbacks.login} error={error}/>}
        </>
    </Spinner>
  );
}

export default React.memo(Login);