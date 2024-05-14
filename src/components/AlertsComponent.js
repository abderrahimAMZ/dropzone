import {AlertError, AlertInfo, AlertSuccess} from "./Alerts";
import {useAuth} from "../hooks/AuthProvider";

const AlertsComponent = () => {
    const auth = useAuth();
    return (
        <div className={"absolute z-50 sm:w-5/10 mr-10 ml-10 mt-4"}>

            <div className={"alerts-2"}>
                {auth.alertQueue.length > 0 && (
                        (() => {
                            let alert = auth.alertQueue[0];
                            return (
                                <div className={"mb-2"}>
                                    {alert.type === 'info' && <AlertInfo>{alert.message}</AlertInfo>}
                                    {alert.type === 'error' && <AlertError>{alert.message}</AlertError>}
                                    {alert.type === 'success' && <AlertSuccess>{alert.message}</AlertSuccess>}
                                </div>
                            );
                        })()
                    )
                }
            </div>
        </div>
    )
}
export default AlertsComponent;