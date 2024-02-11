import { useCallback, useState } from 'react';
import { useDropzone} from 'react-dropzone';

import Layout from '../components/Layout';
import Container from '../components/Container';
import FormRow from '../components/FormRow';
import FormLabel from '../components/FormLabel';
import InputText from '../components/InputText';
import Button from '../components/Button';
import axios from "axios";
import {useAuth} from "../hooks/AuthProvider";


function FileUploader() {
  const user = useAuth();
  const onDrop = useCallback((acceptedFiles) => {
    const file = new FileReader;

    file.onload = function() {
      setPreview(file.result);
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  const [preview, setPreview] = useState(null);

  /**
   * handleOnSubmit
   */

  async function handleOnSubmit(e) {
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
    const response = await axios.post('http://localhost:8000/fileUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + user.token,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error sending data:', error);
  }

    /*

    const results = await fetch('http://localhost:8000/save_user_info', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body : formData
    }).then(r => r.json());
    console.log('results', results);

     */

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
                       className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                      drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                  }
                </label>
              </div>
            </div>
          </FormRow>

          {preview && (
              <p className="mb-5">
                <img src={preview} alt="Upload preview"/>
              </p>
          )}

          <Button>Submit</Button>
        </form>

      </Container>
    </Layout>
  )
}

export default FileUploader;
