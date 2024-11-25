import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useFetchUserQuery, useLoginMutation, useRegistrationMutation } from "../../store/services/users";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";
import RegistrationForm from "../../components/registration-form";
import { setChangedLocalStorage } from "../../store/reducers/users";

function Registration() {

  console.log("Registration");

  const dispatch = useDispatch();

  /*const select = useSelector((state) => ({
    changedLocalStorage: (state as any).usersReducer.changedLocalStorage,
  }));*/
  const changedLocalStorage = useSelector(state => (state as any).usersReducer.changedLocalStorage);
  const memoizedChangedLocalStorage = useMemo(() => {
    return changedLocalStorage;
  }, [changedLocalStorage]);

  const [registrationReq, result] = useRegistrationMutation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const callbacks = {
    registrate: useCallback(async () => {
        let temp = await registrationReq({
            login: (document.getElementById('login') as HTMLInputElement).value,
        });
        console.log(JSON.stringify(temp));
        if (temp.error) {
            setError((temp.error as any).data.message);
            return;
        } else {
            setError(null);
        }
        setLogin(temp.data.login);
        setPassword(temp.data.password);
        localStorage.removeItem('token');
        dispatch(setChangedLocalStorage(memoizedChangedLocalStorage + 1));
    }, []),
  };

  return (
    <RegistrationForm registrate={callbacks.registrate} login={login} password={password} error={error}/>
  );
}

export default React.memo(Registration);