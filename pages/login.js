import axios from 'axios'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { serverApi } from '../src/api/api'
import Loader from '../src/loader/loader'

export default function Login() {
const router = useRouter();
const initialValues = {
  username:"",
  password:""
}

const onSubmit = (data,{resetForm}) => {

  setDone(false)
 
  axios.post(`${serverApi}admin/login`,data).then((response)=>{
    console.log(response.data);
   
    if(response.data.error){
      setErrorMessage(response.data.error)
      setDone(true);
      return;
    }
    setErrorMessage("Logging in....")
   setDone(true);
   router.push('/result');
  })
}
const [errorMessage,setErrorMessage] = useState('');
const [done,setDone] = useState(true);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-main flex-col" >
          <div className=' flex flex-col items-center justify-center ' >
            <img src="/images/logo.png" alt="logo" className='w-[250px] h-[200px]' />
            <h1 className='font-bold text-5xl font-serif text-test' >PAYROLL</h1>
            <h1 className='font-bold text-1xl font-serif text-test mt-5' >LOGIN</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit}  >
              <Form autoComplete='off' className='flex flex-col' >
                <Field placeholder="Username" name="username"  className="w-[300px] m-5 p-[10px] font-serif text-center rounded-[10px]  outline-none " required />
                <Field name="password" placeholder="Password"  className="w-[300px] m-5 p-[10px] font-serif text-center rounded-[10px]  outline-none " type="password" required />
                <button type="submit" className='text-test border border-test w-[90px] ml-auto mr-[20px] p-[2px] hover:bg-hovergray' >LOGIN</button>
              </Form>
            </Formik>
          </div>
          <div className='text-test' >{errorMessage}</div>

           <button onClick={()=>{router.push('/register')}} className=' text-test m-20  border-none bg-transparent' >  Dont have an account? Click here</button>
 
    </div>
  )
}
