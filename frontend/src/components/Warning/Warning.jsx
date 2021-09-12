import React from 'react';
import { useDispatch } from 'react-redux';
import { warningCardResetAction, warningCardSuccessAction } from '../../actions/warningActions';
import './Warning.scss';

const Warning = () => {

    const dispatch = useDispatch();


    return (
        <>
           <div className="warning-card-wrapper">
                <div className="warning-card">
                    <p>Are you sure?</p>
                    <div className="yes-cancel-buttons">
                        <input type="button" value="Yes" className="yes-button"
                            onClick={() => {
                                dispatch(warningCardSuccessAction());
                            }}
                        />
                        <input type="button" value="Cancel" className="cancel-button" 
                            onClick={() => {
                                dispatch(warningCardResetAction());
                            }}
                        />
                    </div>
                </div>
           </div>
            
        </>
    )
}

export default Warning;
