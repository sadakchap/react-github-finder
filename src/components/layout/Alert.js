import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const { alert } = useContext(AlertContext);
    console.log(alert)
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
