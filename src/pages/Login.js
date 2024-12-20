import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Layout from "../components/Layout";
import Container from "../components/Container";
import {Link} from "react-router-dom";
import AlertsComponent from "../components/AlertsComponent";
const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });



    const auth = useAuth();
    auth.setSentVerification(false);
    const handleSubmitEvent = (e) => {
        console.log("input");
        console.log(input);
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            debugger;
            auth.loginAction(input);
            return;
            //dispatch action from hooks
        }
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

            <section class="bg-white dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <h1 className="sm:text-5xl text-4xl font-black text-center text-slate-900 mb-8 sm:w-full">
                        instagrampro.ai
                    </h1>
                    <div
                        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 sm:w-500px sm:m-auto">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmitEvent}>
                                <div>
                                    <label for="email"
                                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email or username</label>
                                    <input type="username" name="username" onChange={handleInput} id="email"
                                           class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="email or username" required=""/>
                                </div>
                                <div>
                                    <label for="password"
                                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" onChange={handleInput} id="password"
                                           placeholder="••••••••"
                                           class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required=""/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="/resetPassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                </div>
                                <button type="submit"
                                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                                    in
                                </button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to="/register"
                                                                  class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                    up</Link>
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
