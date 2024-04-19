import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Layout from "../components/Layout";
import Container from "../components/Container";
import {Link} from "react-router-dom";
import AlertsComponent from "../components/AlertsComponent";
const Login = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    });


    const auth = useAuth();
    auth.setSentVerification(false);
    const handleSubmitEvent = (e) => {
        console.log("input");
        console.log(input);
        const confirm_password = document.getElementById("confirm-password").value;
        e.preventDefault();
        console.log(confirm_password);
        if ( input.username !== "" && input.email !== "" && input.password !== "" ) {
            if (input.password !== confirm_password) {
                auth.addAlertToQueue('error', "Passwords do not match")
            }
            else {
                auth.CreateAccount(input);

            }
            }
            return;
            //dispatch action from hooks
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        debugger;
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
                <section class="bg-gray-50 dark:bg-gray-900">
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <h1 className="sm:text-5xl text-4xl font-black text-center text-slate-900 mb-20 sm:w-full">
                            instagrampro.ai
                        </h1>
                        <div
                            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 sm:w-500px sm:m-auto ">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an Account
                                </h1>
                                <form class="space-y-4 md:space-y-6" onSubmit={handleSubmitEvent}>
                                    <div>
                                        <label htmlFor="username"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                            username</label>
                                        <input type="username" name="username" id="username"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               onChange={handleInput}
                                               placeholder="username" required=""/>
                                    </div>
                                    <div>
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                            email</label>
                                        <input type="email" name="email" id="email"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               onChange={handleInput}
                                               placeholder="name@company.com" required=""/>
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               onChange={handleInput}
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
                                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                                        an account
                                    </button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <Link to="/login"
                                                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                                        here</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
        </Layout>
    );
};

export default Login;
