import React from "react";
import PropTypes from 'prop-types';
import EmailSettingsWarning from "../../components/EmailSettingsWarning";
import User from "../../services/user";
import LoadingState from "../../components/items-list/components/LoadingState";
import DynamicComponent from "../../components/DynamicComponent";
import { error } from "console";
import routes from "../../services/routes";
import EditableUserProfile from "./components/EditableUserProfile";
import ReadOnlyUserProfile from "./components/ReadOnlyUserProfile";


function UserProfile({userId, onError}:{userId:string, onError:Function}){
    
    const [user, setUser] = useState(null);
    const handleError = useImmutableCallback(onError);

    useEffect(() => {
        let isCancelled = false;
        User.get({id:userId || currentUser.id}).then(user=>{
            if(!isCancelled){
                setUser(User.convertUserInfo(user));
            }
        }).catch(error=>{
            if(!isCancelled){
                handleError(error);
            }
        });

        return () => {
            isCancelled = true;
        }
    }, [userId, handleError]);

    const canEdit= user && (user.id === currentUser.id || currentUser.isAdmin);

    
    return (
        <React.Fragment>
            <EmailSettingsWarning featureName={window.W_L.invite_email} mode='icon' className='m-b-20' adminOnly/>
        <div className="row">
            {!user && <LoadingState/>}
            {user && (<DynamicComponent name="UserProfile" user={user}>
                {canEdit && <EditableUserProfile user={user}/>}
                {!canEdit && <ReadOnlyUserProfile user={user}/>}
                </DynamicComponent>)}
        </div>
        </React.Fragment>
    )
}

UserProfile.propTypes = {
    userId: PropTypes.string,
    onError: PropTypes.func
}
UserProfile.defaultProps = {
    userId: null,
    onError: () => {}
};

const UserProfilePage= wrapSettingsTab("Users.Account", {title: window.W_L.personal_setting, path: 'users/me', order: 7}, UserProfile);

routes.register("Users.Account", routeWithUserSession({path: '/users.me', title:window.W_L.personal_setting, render:pageProps=> <UserProfilePage {...pageProps}/>}));

routes.register("Users.ViewOrEdit", routeWithUserSession({path: 'users/:userId', title:window.W_L.account, render:pageProps=> <UserProfilePage {...pageProps}/>}));


