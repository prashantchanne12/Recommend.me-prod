import React, {useState} from 'react';
import './ChangeUserName.scss';
import {AiOutlineCloseCircle} from 'react-icons/ai';

import { useSelector, useDispatch } from 'react-redux';
import { changeUserNameCardReset } from '../../actions/userActions';


const ChangeUserName = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.mySession);
    const [userName, setUserName] = useState('userName');

    const changeUserName = (name) => {
        setUserName(name);
    }

    return (
        <>
            <div className="chageUserName">

               <div className="userNameCard">
                   <AiOutlineCloseCircle className="close"
                    onClick={ () => {
                        dispatch(changeUserNameCardReset());
                    }}
                   />
                     <input 
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        value = {user.userName}
                        onChange={(e) =>{
                            changeUserName(e.target.value)
                        }}
                        style={{
                            outlineColor: '#d63031',
                        }}
                    ></input>
                    <p className="err-msg">{`*username is taken`}</p>
                    <div className="change-name-button">
                    <input type="button" value="submit" />
               </div>
               </div>
             
           

            </div>
        </>
    )
}

export default ChangeUserName;
