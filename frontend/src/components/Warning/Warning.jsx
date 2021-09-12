import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {warningCardResetAction, warningCardSuccessAction} from '../../actions/warningActions';
import './Warning.scss';
import Loader from "react-loader-spinner";


const Warning = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {id, loading, profile} = useSelector(state => state.warningCard)

    useEffect(() => {

        if (profile){
            history.push('/profile');
        }

    }, [profile, history]);
    

    return (
        <>
           <div className="warning-card-wrapper">
                <div className="warning-card">
                    <p>Are you sure?</p>
                    <div className="yes-cancel-buttons">
                        <input type="button" value="Yes" className="yes-button"
                            onClick={() => {
                                dispatch(warningCardSuccessAction(id));
                            }}
                        />
                        <input type="button" value="Cancel" className="cancel-button"
                            onClick={() => { dispatch(warningCardResetAction()) }}
                        />

                        {
                            loading &&  
                            <div
                                style={{
                                    paddingLeft: '0.5rem',
                                }}
                            >
                                <Loader
                                type="Oval"
                                color="#16a085"
                                height={20}
                                width={20}
                                />

                            </div>
                        }

                    </div>
                </div>
           </div>
            
        </>
    )
}

export default Warning;
