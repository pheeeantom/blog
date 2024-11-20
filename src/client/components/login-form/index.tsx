import React, { useEffect, useReducer, useRef, useState } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { useFetchUserQuery, useLoginMutation } from "../../store/services/users";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setChangedLocalStorage, User } from "../../store/reducers/users";

function LoginForm({login, error}: {login: Function, error: string}) {

  console.log("LoginForm");

  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <form onSubmit={async (e) => {
        e.preventDefault();
        login();
      }}>
        <div className={cn('field', {center: true})}>
          <h1>ВХОД</h1>
        </div>
        {error ? <div className={cn('error')}>
            <p>{error}</p>
          </div> : ''}
        <div className={cn('field')}>
            <label htmlFor="login">Ник:</label>
            <input id="login" type="text" name="login" />
        </div>
        <div className={cn('field')}>
            <label htmlFor="password">Пароль:</label>
            <input id="password" type="password" name="password" />
        </div>
        <div className={cn('field')}>
          <Link to="/registrate">Нет аккаунта, зарегестрироваться</Link>
        </div>
        <div className={cn('field', {center: true})}>
          <input type="submit" value="Войти"/>
        </div>
      </form>
    </div>
  );
}

export default React.memo(LoginForm);