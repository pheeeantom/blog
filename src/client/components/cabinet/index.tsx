import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { User } from "../../store/reducers/users";
import { Link } from "react-router-dom";
import TwoSided from "../two-sided";

function Cabinet({user, logout}: Readonly<{user: User, logout: Function}>) {

  console.log("Cabinet");

  const cn = bem('Cabinet');

  return (
    <div className={cn()}>
        <TwoSided left={<Link to='/'>Главная</Link>} right={
            <>
                <span>{user.login}</span>
                <span><button onClick={() => logout()}>Выйти</button></span>
            </>
        }/>
    </div>
  );
}

export default React.memo(Cabinet);