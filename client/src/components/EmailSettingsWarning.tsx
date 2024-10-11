import React from "react";
import PropType, { func } from 'prop-types';
import Alert from 'antd/lib/alert';
import ToolTip from "./components/Tooltip";
import HelpTrigger from "components/HelpTrigger";
import PropTypes from "prop-types";


export default function EmailSettingsWarning({featureName, className, mode,adminOnly}){
    const messageDescriptionId = useUniqueId("sr-mail-description");

    if (!clientConfig.mailSettingsMissing){
        return null;
    }
    if (adminOnly && !currentUser.isAdmin){
        return null
    }
    const message= (
        <span id ={messageDescriptionId}>{window.W_L.email_need_set}, {featureName} {window.W_L.email_will_work}
        <HelpTrigger type= "MAIL_CONFIG" className="f-inherit"/>
        </span>
    );
    if (mode==="icon"){
        return (
            <ToolTip title= {message} placement="topRight" arrowPointAtCenter>
                <span className={className} aria-label="Mail alert" aria-describedby={messageDescriptionId} tabIndex={0}>
                    <i className={"fa fa-exclamation-triangle"} aria-hidden="true"/>
                </span>
            </ToolTip>
        )
    }
    return <Alert message= {message} type="error" className={className}/>
}

EmailSettingsWarning.propType={
    featureName: PropTypes.string.isRequired,
    className: PropTypes.string,
    mode: PropTypes.oneOf(['alert', 'icon']),
    adminOnly:PropTypes.bool,
}

EmailSettingsWarning.defaultProp= {
    className: null,
    mode: 'alert',
    adminOnly:false,
}
