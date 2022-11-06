import { Formik,Form,Field,ErrorMessage } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Loader from '../src/loader/loader';
import axios from 'axios'
import { serverApi } from '../src/api/api';
export default function Register() {
const router = useRouter();
const initialValues = {
  username:"",
  password:"",
  cpassword:"",
}

const onSubmit = (data,{resetForm}) => {
  setDone(false);

  if(data.password != data.cpassword){
    setErrorMessage('Password do not match');
    setDone(true);
    return;
  }

  const newData = {username:data.username,password:data.password}
  axios.post(`${serverApi}admin/create`,newData).then((response)=>{
    console.log(response.data);
   
  
    setDone(true);
    router.push('/login');
  })
  
}
const [errorMessage,setErrorMessage] = useState('');

const back = () => {
  router.push('/login')
}

const [done,setDone] = useState(true);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-main flex-col" >
        {
          done? (  <div className=' flex flex-col items-center justify-center ' >
          <img src="/images/logo.png" alt="logo" className='w-[250px] h-[200px]' />
          <h1 className='font-bold text-5xl font-serif text-test' >PAYROLL</h1>
          <h1 className='font-bold text-1xl font-serif text-test mt-5' >REGISTER</h1>
          <Formik initialValues={initialValues} onSubmit={onSubmit}  >
            <Form autoComplete='off' className='flex flex-col' >
              <Field placeholder="Username" name="username"  className="w-[300px] m-3 p-[10px] font-serif text-center rounded-[10px]  outline-none " required />
              <Field name="password" placeholder="Password"  className="w-[300px] m-3 p-[10px] font-serif text-center rounded-[10px]  outline-none " type="password" required />
              <Field name="cpassword" placeholder="Confirm Password"  className="w-[300px] m-3 p-[10px] font-serif text-center rounded-[10px]  outline-none " type="password" required />
             <div className='ml-auto' >
             <button type="button" onClick={back}  className='text-test border border-test w-[90px] ml-auto mr-[20px] p-[2px] hover:bg-hovergray' >BACK</button>
             <button type="submit"  className='text-test border border-test w-[90px] ml-auto mr-[20px] p-[2px] hover:bg-hovergray' >PROCEED</button>
             </div>
            </Form>
          </Formik>
          {/* <div> {} </div> */}
        </div>
        ):<Loader/>
        }
        <div className='text-test' >{errorMessage}</div>

       

    </div>
  )
}
