import React from 'react';
import './Warning.scss';

const Warning = () => {
    return (
        <>
           <div className="warning-card-wrapper">
                <div className="warning-card">
                    <p>Are you sure?</p>
                    <div className="yes-cancel-buttons">
                        <input type="button" value="Yes" className="yes-button"/>
                        <input type="button" value="Cancel" className="cancel-button" />

                    </div>
                </div>
           </div>
            
        </>
    )
}

export default Warning;
