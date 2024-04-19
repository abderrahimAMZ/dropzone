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

function FileBrowser() {
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
                                    <AlertInfo>Your account is not verified. Please check your email for the verification link.</AlertInfo>
                                </div> : <p></p>
                        }
                    </div>

                </div>

                <div>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    File name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    File type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    File size
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Upload Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                               context.user != null ? context.user.files.map((file, index) => {
                                   console.log(context);
                                      return (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {file.filename}
                                             </th>
                                             <td className="px-6 py-4">
                                                 {file.content_type}
                                             </td>
                                             <td className="px-6 py-4">
                                                 {file.length}
                                             </td>
                                             <td className="px-6 py-4">
                                                  {file.upload_date}
                                             </td>
                                             <td className="px-6 py-4">
                                                  <Link href={`/file/${file.filename}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                                             </td>
                                        </tr>
                                      );
                                 })
                                   : <div></div>
                            }
                            </tbody>
                        </table>
                    </div>


                </div>
            </Container>

        </Layout>
    )
}

export default FileBrowser;
