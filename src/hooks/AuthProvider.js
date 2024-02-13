import {useContext, createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("instagramprotoken") || "");
    const navigate = useNavigate();

    const loginAction = async (data) => {

            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
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
                    setToken(response.data.access_token);
                    localStorage.setItem("instagramprotoken", response.data.access_token);
                    navigate("/");
                    return;
                } else {
                    throw new Error(response.message);
                }

            }
             catch (error) {
                console.error('Error sending data:', error);
            }

            /*
        try {
            console.log(data)
            const response = await fetch("http:/localhost:8000/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            console.log(res)
            if (res.data) {
                setUser(res.data.user);
                setToken(res.token);
                localStorage.setItem("site", res.token);
                navigate("/dashboard");
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }

             */
    };
    const CreateAccount = async (data) => {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
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
                console.log(response.data);
                navigate("/login");
                return;
            } else {
                throw new Error(response.message);
            }

        }
        catch (error) {
            console.error('Error sending data:', error);
        }

    }

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };

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
            } else {
                navigate("/login");
                throw new Error(response.message);
            }

        } catch (error) {
            navigate("/login");
            console.error('Error sending data:', error);
        }

    }
    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut,CreateAccount, getUser }}>
            {children}
        </AuthContext.Provider>
    );

};
export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
