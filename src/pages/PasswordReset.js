import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Layout from "../components/Layout";
import Container from "../components/Container";
import {Link} from "react-router-dom";
import {AlertError, AlertInfo, AlertSuccess} from "../components/Alerts";
import AlertsComponent from "../components/AlertsComponent";
const PasswordReset = () => {
    const [input, setInput] = useState({
        "email": "",
        "code" : "",
        "password" : "",
        "confirm-password" : ""
    });


    const auth = useAuth();
    const handleSendVerificationCode = (e) => {
        console.log("input");
        console.log(input);
        e.preventDefault();
        if (input.email !== "") {
            auth.sendVerificationCodeToEmail(input);
            return;
            //dispatch action from hooks
        }
    };
    const handlePasswordChange = (e) => {
        console.log("input");
        console.log(input);
        const confirm_password = document.getElementById("confirm-password").value;
        e.preventDefault();
        console.log(confirm_password);
        if (input.password !== confirm_password) {
            auth.addAlertToQueue('error', "Passwords do not match")
        }
        else if (input.password !== "" && input.code !== "") {
            auth.changePassword(input);
            return;
            //dispatch action from hooks
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => (
            console.log(prev),
                {
                    ...prev,
                    [name]: value,
                }));

    };

    return (
        <Layout>

                <AlertsComponent />


            <section class="dark:bg-gray-900 sm:w-500px sm:m-auto sm:mt-4">
                <div class="flex flex-col items-center justify-center px-6 py-8   lg:py-0">
                    <div
                        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm: sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        {
                        !auth.sentVerification ?
                        <div class="p-6 space-y-4 md:space-y-6 md:mt-4">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset your Password
                            </h1>
                            <form className="space-y-4 md:space-y-6 sm:w-500px sm:m-auto" onSubmit={handleSendVerificationCode}>

                                    <label for="email"
                                           className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white w-8/12"}>
                                        Email</label>
                                    <input type="username" name="email" onChange={handleInput} id="email"
                                           className="sm:w-8/12 w-11/12 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="email or username" required=""/>
                                <button type="submit"
                                        className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Send verification code
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to="/register"
                                                                     class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                    up</Link>
                                </p>
                            </form>
                        </div> :
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8 mt-4">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Change Password
                                </h1>
                                <form class="space-y-4 md:space-y-6" onSubmit={handlePasswordChange}>
                                    <div>
                                        <label htmlFor="code"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verification Code</label>
                                        <input type="number" name="code" onChange={handleInput} id="verification-code"
                                               placeholder="verification code here"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required=""/>
                                    </div>
                                    <div>
                                        <label for="password"
                                               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" onChange={handleInput} id="password"
                                               placeholder="••••••••"
                                               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required=""/>
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                            password</label>
                                        <input type="confirm-password" name="confirm-password" id="confirm-password"
                                               placeholder="••••••••"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required=""/>
                                    </div>
                                    <button type="submit"
                                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Password
                                    </button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <Link to="/register"
                                                                         class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                        up</Link>
                                    </p>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PasswordReset;
