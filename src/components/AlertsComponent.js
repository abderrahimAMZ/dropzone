import {AlertError, AlertInfo, AlertSuccess} from "./Alerts";
import {useAuth} from "../hooks/AuthProvider";

const AlertsComponent = () => {
    const auth = useAuth();
    return (
        <div className={"w-5/10 mr-10 ml-10 mt-4"}>

            <div className={"alerts-2"}>
                {
                    auth.alertQueue.map((alert, index) => {
                        setTimeout(()=>auth.removeAlertFromQueue(), 10000);
                        return (
                            <div key={index} className={"mb-2"}>
                                {alert.type === 'info' && <AlertInfo>{alert.message}</AlertInfo>}
                                {alert.type === 'error' && <AlertError>{alert.message}</AlertError>}
                                {alert.type === 'success' && <AlertSuccess>{alert.message}</AlertSuccess>}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}
export default AlertsComponent;