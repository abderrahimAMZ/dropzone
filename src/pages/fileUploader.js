import {useCallback, useMemo, useState} from 'react';
import { useDropzone} from 'react-dropzone';

import Layout from '../components/Layout';
import Container from '../components/Container';
import FormRow from '../components/FormRow';
import Button from '../components/Button';
import axios from "axios";
import {useAuth} from "../hooks/AuthProvider";
import myImage from '../icons8-archive-30.png';


function FileUploader() {
  const user = useAuth();
  const [accepted_file, setAceepted_file] = useState("");
  const [loading, setLoading] = useState(false);
  const [file_success, setFile_success] = useState(false);
  const [file_fail, setFile_fail] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    const file = new FileReader;

    file.onload = function() {
      setPreview(file.result);
    }

    setAceepted_file(acceptedFiles[0].name);
    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
    accept:  {
        "application/zip": ".zip"
    },
    onDropRejected : (fileRejections) => {
      fileRejections.forEach(({file, errors}) => {

          }
      );
    }});

  const [preview, setPreview] = useState(null);

  /**
   * handleOnSubmit
   */

  async function handleOnSubmit(e) {
    var uploading = false;
    e.preventDefault();

    if ( typeof acceptedFiles[0] === 'undefined' ) return;

    const formData = new FormData();
    console.log(acceptedFiles[0]);
    formData.append('file', acceptedFiles[0]);

    /*
    console.log('acceptedFiles[0]', acceptedFiles[0]);
    console.log('preview', preview);

     */
    /*
    // what does an upload preset do?
    // https://cloudinary.com/documentation/upload_images#upload_presets
    formData.append('upload_preset', '<Your Upload Preset>');
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);

     */


    /*
    const results = await fetch('https://api.cloudinary.com/v1_1/<Your Cloud Name>/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

     */

// Set up additional headers if needed
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
    console.log('formData', formData);
    try {
      setLoading(true);
    const response = await axios.post('http://localhost:8000/fileUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + user.token,
      },
    }).then(r => {
      console.log(r);
      setLoading(false);
      setFile_success(true);
        setFile_fail(false);
    })

  } catch (error) {
    setLoading(false);
    setFile_fail(true);
    setFile_success(false);
    console.error('Error sending data:', error);
  }
  }




  return (
    <Layout>

      <Container>
        <h1 className="text-6xl font-black text-center text-slate-900 mb-20">
          instagrampro.ai
        </h1>

        <form className="max-w-md border border-gray-200 rounded p-6 mx-auto" onSubmit={handleOnSubmit}>


          <FormRow className="mb-5">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file"
                       className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray--500 dark:hover:bg-gray-600`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                      drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ZIP</p>
                  </div>
                  {
                    isDragActive ?
                        <p> Upload your file </p> :
                        <p></p>
                  }
                </label>
              </div>
            </div>
          </FormRow>

          <div className={"mt-4 mb-4"}>
          {preview ?
              <div className={"flex items-center justify-start"}
              >

                <img src={myImage} alt="preview"/><p> {accepted_file} </p>

                <div className={"ml-1"}>
                {loading ?
                    <svg aria-hidden="true"
                         className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"/>
                      <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"/>
                    </svg> :
                    file_success ?
                    <svg className="w-4 h-4 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path
                          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg> :
                    file_fail ?
                        <svg className="w-4 h-4 me-2 text-red-500 dark:text-red-400 flex-shrink-0" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16Zm0-2a6 6 0 100-12 6 6 0 000 12ZM9 7a1 1 0 112 0v5a1 1 0 11-2 0V7Z"/>
                        </svg> :
                        <p></p>
                }
                </div>

              </div>
              :
              <p></p>
          }

          </div>








          <button type="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Upload
            file
          </button>
        </form>

      </Container>
    </Layout>
  )
}

export default FileUploader;
