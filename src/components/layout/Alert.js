import React from 'react'

const Alert = ({ alert }) => {
    if(alert !== null )
        return (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        )

    return(
        <div></div>
    )
}

export default Alert
