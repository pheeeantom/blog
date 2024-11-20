import React, { useEffect, useReducer, useRef, useState } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { useFetchUserQuery, useLoginMutation, useRegistrationMutation } from "../../store/services/users";
import { useDispatch } from "react-redux";
import { Link, redirect } from "react-router-dom";

function RegistrationForm({registrate, login, password, error}: {registrate: Function, login: string, password: string, error: string}) {

  console.log("RegistrationForm");

  const cn = bem('RegistrationForm');

  return (
    <div className={cn()}>
        <form onSubmit={async (e) => {
            e.preventDefault();
            registrate();
        }}>
            {
                !password ?
                    <>
                        <div className={cn('field', {center: true})}>
                            <h1>РЕГИСТРАЦИЯ (будет выдан пароль)</h1>
                        </div>
                        {error ? <div className={cn('error')}>
                            <p>{error}</p>
                        </div> : ''}
                        <div className={cn('field')}>
                            <label htmlFor="login">Ник:</label>
                            <input id="login" type="text" name="login" />
                        </div>
                    </> :
                    <>
                        <div>{'Ваш логин: ' + login}</div>
                        <div>{'Ваш пароль: ' + password}</div>
                    </>
            }
            <div className={cn('field')}>
              <Link to="/login">Вернуться на вход</Link>
            </div>
            {!password ?
                <div className={cn('field', {center: true})}>
                    <input type="submit" value="Зарегестрироваться"/>
                </div> :
                ''
            }
        </form>
    </div>
  );
}

export default React.memo(RegistrationForm);