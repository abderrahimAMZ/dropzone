import {useContext, createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("instagramprotoken") || "");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [file_success, setFile_success] = useState(false);
    const [file_fail, setFile_fail] = useState(false);
    const [sentVerification, setSentVerification] = useState(false);
    const [showConfirmationBlock, setShowConfirmationBlock] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [fileToRename, setFileToRename] = useState(null);
    const [fileToDownload, setFileToDownload] = useState(null);

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';

    const [alertQueue, setAlertQueue] = useState([]);
    const addAlertToQueue = (type, message) => {
        setTimeout(()=>removeAlertFromQueue(),5000);
        setAlertQueue(prevQueue => [...prevQueue, { type, message }]);
    };
    // Function to remove alert from the queue after it's displayed
    const removeAlertFromQueue = () => {
        setAlertQueue(prevQueue => {
            if (prevQueue.length > 0) {
                setAlertQueue(prevQueue.slice(1));
            }
            // If no alert is found that is not of type 'info', return the queue as is
            return prevQueue;
        });
    };


// Add this to your existing state variables

    const fetchFiles = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${username}/files`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            if (response.data) {
                console.log(response.data);
                return response.data;
            }
            else {
                throw new Error(response.message);
            }

        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    const loginAction = async (data) => {

            const formdata = new FormData();

            formdata.set("username", data.username);
            formdata.set("password", data.password);

            console.log(formdata);
            try {
                const response = await axios.post('http://localhost:8000/token', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                if (response.data) {
                    addAlertToQueue('success', "login successful");
                    setToken(response.data.access_token);
                    localStorage.setItem("instagramprotoken", response.data.access_token);
                    navigate("/");
                    return;
                } else {
                    addAlertToQueue('error', "username or password is incorrect please try again.");
                    throw new Error(response.message);
                }

            }
             catch (error) {
                 addAlertToQueue('error', "username or password is incorrect please try again.");
                console.error('Error sending data:', error);
            }

    };
    const CreateAccount = async (data) => {
        const formdata = new FormData();

        formdata.set("username", data.username);
        formdata.set("email", data.email);
        formdata.set("password", data.password);

        console.log("this is form data: ")
        console.log(formdata);
        try {
            const response = await axios.post('http://localhost:8000/users/create', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if (response.data) {
                addAlertToQueue('info', response.data.message);
                console.log(response.data);
                navigate("/login");
                return;
            } else {
                addAlertToQueue('error', response.data.message);
            }

        }
        catch (error) {
            addAlertToQueue('error', "the email you entered is not valid it must have exactly one @ symbol");
            console.error('Error sending data:', error);
        }

    }

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        setAlertQueue([]);
        navigate("/login");
        addAlertToQueue('success', "You have been logged out")
    };

    // Function to resend email verification
    const renameFile = async (fileName) => {
    }
    const deleteFile = async (file_id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/fileDelete/${file_id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                },
            });
            console.log(response.data);
            if (response.data) {
                addAlertToQueue('success', response.data.message);
                console.log(response.data);
                return;
            } else {
                addAlertToQueue('error', response.data.message);
                throw new Error(response.message);
            }

        }
        catch (error) {
            console.error('Error sending data:', error);
        }
    }
    const resendEmail = async (username) => {
        const formdata = new FormData();

        formdata.set("username", username);

        console.log("this is form data: ")
        console.log(formdata);
        try {
            const response = await axios.post('http://localhost:8000/users/resend', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if (response.data) {
                addAlertToQueue('info', response.data.message);
                console.log(response.data);
                return;
            } else {
                addAlertToQueue('error', response.data.message);
                throw new Error(response.message);
            }

        }
        catch (error) {
            console.error('Error sending data:', error);
        }
    }

    const uploadFile = async (data) => {

        console.log('formData', data);
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/fileUpload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + token,
                },
            }).then(r => {
                console.log(r);
                addAlertToQueue('success', r.data.message);
                setLoading(false);
                setFile_success(true);
                setFile_fail(false);
            })

        } catch (error) {
            addAlertToQueue('error', error.response.data.detail);
            setLoading(false);
            setFile_fail(true);
            setFile_success(false);


            console.error('Error sending data:', error);
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("instagramprotoken"),
                },
            });
            console.log(response);
            if (response.data) {
                console.log(response.data);
                setUser(response.data);
                return;
            }
            else {
                navigate("/login");
                throw new Error(response.message);
            }

        } catch (error) {
            navigate("/login");
            console.error('Error sending data:', error);
        }

    }
    const sendVerificationCodeToEmail = async (data) => {
        const formdata = new FormData();

        formdata.set("email", data.email);

        console.log("this is form data: ")
        console.log(formdata);
        try {
            const response = await axios.post('http://localhost:8000/password-reset/request', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if (response.data) {
                setSentVerification(true);
                console.log(response.data);
                addAlertToQueue('info', response.data.message);
                return;
            } else {
                addAlertToQueue('error', response.data.message);
            }

        }
        catch (error) {
            addAlertToQueue('error', "the email you entered is not valid it must have exactly one @ symbol");
            console.error('Error sending data:', error);
        }
    }
    const changePassword = async (data) => {
        const formdata = new FormData();

        formdata.set("password", data.password);
        formdata.set("code", data.code);


        console.log("this is form data: ")
        console.log(formdata);
        try {
            const response = await axios.post('http://localhost:8000/password-reset', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if (response.data) {
                setTimeout(()=>setSentVerification(false), 4000);
                console.log(response.data);
                addAlertToQueue('success', response.data.message);
                setTimeout(()=>navigate("/login"), 3000);
                return;
            } else {
                addAlertToQueue('error', response.data.message);
                throw new Error(response.message);
            }

        }
        catch (error) {
            addAlertToQueue('error', error.response.data.detail);
            console.error('Error sending data:', error);
        }

    }

    // Function to remove alert from the queue after it's displayed
    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut,CreateAccount, getUser, resendEmail,uploadFile,loading,file_fail,file_success,alertQueue,setAlertQueue,addAlertToQueue,removeAlertFromQueue, setFile_fail,setFile_success,setLoading,
            sendVerificationCodeToEmail, sentVerification, changePassword,setSentVerification, fetchFiles, renameFile, deleteFile, showConfirmationBlock, setShowConfirmationBlock,
            fileToDelete, setFileToDelete, fileToRename, setFileToRename, fileToDownload, setFileToDownload
        }}>
            {children}
        </AuthContext.Provider>
    );

};
export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
