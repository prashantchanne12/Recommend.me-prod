import React, {useState} from 'react';
import './ChangeUserName.scss';
import {AiOutlineCloseCircle} from 'react-icons/ai';


const ChangeUserName = () => {
    const [userName, setUserName] = useState('userName');

    const changeUserName = (name) => {
        setUserName(name);
    }

    return (
        <>
            <div className="chageUserName">

               <div className="userNameCard">
                   <AiOutlineCloseCircle className="close"/>
                     <input 
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        value = {userName}
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
