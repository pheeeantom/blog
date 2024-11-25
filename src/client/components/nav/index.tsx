import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { User } from "../../store/reducers/users";
import { Link } from "react-router-dom";
import Spinner from "../spinner";
import TwoSided from "../two-sided";

function Nav({fetchedUser, logout}: Readonly<{fetchedUser: any, logout: Function}>) {

  console.log("Nav");

  const cn = bem('Nav');

  return (
    <div className={cn()}>
        <TwoSided left={<Link to='/'>Главная</Link>} right={
            <Spinner active={fetchedUser.isLoading || fetchedUser.isUninitialized}>
                {!fetchedUser.error && fetchedUser.data ? <>{fetchedUser.data.login}<button onClick={() => logout()}>Выйти</button></> : <>
                    <Link to="/login">Войти</Link>
                    /
                    <Link to="/registrate">Зарегестрироваться</Link>
                </>}
            </Spinner>
        }/>
    </div>
  );
}

export default React.memo(Nav);