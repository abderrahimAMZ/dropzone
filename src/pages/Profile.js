import {useCallback, useEffect, useMemo, useState} from 'react';
import { useDropzone} from 'react-dropzone';

import Layout from '../components/Layout';
import Container from '../components/Container';
import FormRow from '../components/FormRow';
import axios from "axios";
import {useAuth} from "../hooks/AuthProvider";
import myImage from '../icons8-archive-30.png';
import {AlertInfo,AlertError,AlertSuccess} from "../components/Alerts";
import {Link} from "wouter";

function Profile() {
    const context = useAuth();
    useEffect(() => {

        if (context.user == null) {
            context.getUser()

        }
    },[]);






    return (
        <Layout>

            <Container>

                <div className={"mt-20"}>

                    <div className={"alerts"}>
                        {
                            context.alertQueue.map((alert, index) => {
                                setTimeout(()=>context.removeAlertFromQueue(), 10000);
                                return (
                                    <div key={index} className={"mb-4"}>
                                        {alert.type === 'info' && <AlertInfo>{alert.message}</AlertInfo>}
                                        {alert.type === 'error' && <AlertError>{alert.message}</AlertError>}
                                        {alert.type === 'success' && <AlertSuccess>{alert.message}</AlertSuccess>}
                                    </div>
                                );
                            })
                        }
                        {
                            context !== null && context.user != null && context.user.verified === false ?
                                <div className={"mb-4"}>
                                    <AlertInfo>Your account is not verified. Please check your email for the verification link. You can also resend it from the link in your Profile!</AlertInfo>
                                </div> : <p></p>
                        }
                    </div>

                </div>

                <div >


                    {context.user == null ? <p>Loading...</p> :
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:w-1/2 sm:m-auto ">
                        <div className="bg-white overflow-hidden shadow rounded-lg border ">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    User Profile
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    This is some information about the user.
                                </p>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200">
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Username
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {context.user.username}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Email address
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {context.user.email}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Account Status
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {context.user.verified ? "Verified" : <div>Not Verified. can't find verification link? <Link className ="text-blue-600 hover:underline" to="" onClick={()=>context.resendEmail(context.user.username)}> click here to resend!</Link></div>}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Number of files uploaded
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {context.user.files.length}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    }


                </div>
            </Container>

        </Layout>
    )
}

export default Profile;
