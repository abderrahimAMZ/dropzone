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
import DeleteButton from "../components/DeleteButton";
import DeleteConfirmation from "../components/DeleteConfirmation";
import noFilesImage from '../no-file.png';
import AlertsComponent from "../components/AlertsComponent";

function FileBrowser() {
    function convertSize(sizeBytes) {
        if (sizeBytes === 0) {
            return "0B";
        }
        const sizeNames = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(sizeBytes) / Math.log(1024));
        const p = Math.pow(1024, i);
        const s = sizeBytes / p;
        return `${s.toFixed(2)} ${sizeNames[i]}`;
    }
    function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Usage
    const context = useAuth();
    useEffect(() => {

        if (context.user == null) {
            context.getUser()

        }
    },[]);






    return (
        <Layout>


                <div className={"mt-20"}>

                    <div className={"alerts"}>
                        <AlertsComponent />
                        {
                            context !== null && context.user != null && context.user.verified === false ?
                                <div className={"mb-4"}>
                                    <AlertInfo>Your account is not verified. Please check your email for the verification link.</AlertInfo>
                                </div> : <p></p>
                        }
                    </div>

                </div>

                <div>


                    {context.user != null && context.user.files.length == 0 ?
                        <div>
                        <img src={noFilesImage} alt="no have no files" />
                        <h1 className={"text-center"}>You haven't uploaded any files yet!</h1>
                        </div>
                        :
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:mr-12 sm:ml-12">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    File name
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
                                // how to check if a user has files
                               context.user != null && context.user.files.length != 0 ? context.user.files.slice().reverse().map((file, index) => {
                                      return (
                                        <tr key={index} className="bg-white dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-800 border-b dark:border-gray-700">
                                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {file.filename}
                                             </th>
                                             <td className="px-6 py-4">
                                                 {convertSize(Number(file.length))}
                                             </td>
                                             <td className="px-6 py-4">
                                                  {formatDate(file.upload_date)}
                                             </td>
                                             <td className="px-6 py-4">
                                                 <div className={"flex flex-row "}>
                                                     <DeleteButton props={file} />
                                                 </div>
                                             </td>
                                        </tr>
                                      );
                                 })
                                   : <div>
                                   <h1>You haven't uploaded any files yet!</h1>
                                   </div>
                            }
                            </tbody>
                        </table>
                    </div>
                    }
                    <div>
                    {
                        context.showConfirmationBlock ?
                            <DeleteConfirmation file={context.fileToDelete} />
                            : <p></p>
                    }
                    </div>

                </div>

        </Layout>
    )
}

export default FileBrowser;
