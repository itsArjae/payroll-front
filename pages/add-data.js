import React, { useState } from 'react'
import Header from './header'
import { Formik,Form,ErrorMessage,Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Loader from '../src/loader/loader'
import { serverApi } from '../src/api/api'

export default function AddData() {


  const initialValues = {
    name:"",
    number:"",
    age:"",
    gender:"Male",
    email:"",
    address:"",
    hours:"",
    rate:"",
    days:"",
    tax:"",
    philhealth:"",
    sss:""
  }

  const [emp,setEmp] = useState([])
  const onSubmit = (data,{resetForm}) => {
   setDone(false)
    const gross = (Number(data.hours) * Number(data.days)) * Number(data.rate);
    const deductions = Number(data.tax) + Number(data.philhealth) + Number(data.sss);
    const net = gross - deductions;
    const newData = {...data,gross:gross,deduction:deductions,net:net};

    //console.log(newData);
    setEmp(newData);
    axios.post(`${serverApi}employees/create`,newData).then((response)=>{
     setDone(true);
      console.log(response.data);
     resetForm();
     setVisible(true);
    })


  }
  const [done,setDone] = useState(true);
  
  const [visible,setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible)
  }
  return done? (
    <div className=" flex items-center justify-center bg-main flex-col" >
     <div className='w-[100%] mb-auto ' >
      <Header/>
  
     </div>

     <div className='grow text-test ' >

    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      <Form autoComplete='off' className='flex flex-col ' >

        <div className='mt-10 font-serif flex flex-col' >
          <h3>Employee Informations</h3>
          <Field name="name" required className='bg-transparent border-bottom-1 w-[500px] m-[10px] outline-none ' placeholder="Full Name"  />
          <div>
          <Field name="number" required className='bg-transparent border-bottom-1 m-[10px] w-[200px] outline-none' placeholder="Number" type="number"/>
          <Field name="age" required className='bg-transparent border-bottom-1 m-[10px] w-[200px] outline-none' placeholder="Age" />
          <Field as="select" name="gender" required className='bg-transparent border-bottom-1 m-[10px] w-[60px] outline-none' placeholder="gender" type="number" >
            <option className='text-main'  value="Male" >Male</option>
            <option className='text-main' value="Female" >Female</option>
          </Field>
          </div>
          <Field name="email" required className='bg-transparent border-bottom-1 w-[500px] m-[10px] outline-none' placeholder="Email"  />
          <Field name="address" required className='bg-transparent border-bottom-1 w-[500px] m-[10px] outline-none' placeholder="Address"  />

        </div>
        <div className='mt-10 font-serif flex flex-col' >
          <h3>Work Details</h3>
          <Field name="hours" required className='bg-transparent border-bottom-1 w-[500px] m-[10px] outline-none ' placeholder="Hours per day" type="number"  />
          <Field name="rate" required className='bg-transparent border-bottom-1 w-[500px] m-[10px] outline-none' placeholder="Rate per hour" type="number" />
          <Field name="days" required className='bg-transparent border-bottom-1 w-[500px] m-[10px] outline-none' placeholder="Days Worked" type="number" />
 </div>

 <div className='mt-10 font-serif flex flex-col' >
          <h3>Deductions</h3>
          <Field name="tax" required className='bg-transparent border-bottom-1 w-[500px] m-[10px] outline-none ' placeholder="Tax"  />
          <Field name="philhealth" required className='bg-transparent border-bottom-1 w-[500px] m-[10px] outline-none' placeholder="Philhealth"  />
          <Field name="sss" required className='bg-transparent border-bottom-1 w-[500px] m-[10px] outline-none' placeholder="SSS"  />
        </div>
        <button type='submit' >SUBMIT</button>
      </Form>
    </Formik>

     </div>
     {
      visible == true &&(
        <div className='w-screen h-screen position-absolute backdrop-blur-[10px] flex items-center justify-center' >
            <div className='m-auto' > <ResultBox emp={emp} handleVisible={handleVisible} /> </div>
          </div>
      )
     }


      </div>
  ):<div className='w-screen h-screen bg-main flex items-center justify-center ' ><Loader/>  </div>
}

const ResultBox = (props) => {
  const {emp,handleVisible} = props;
  return(
    <div className='bg-test h-[300px] w-[700px] shadow-2xl p-10 flex flex-col  ' >
          <div className='m-[5px]' >Name: {emp?.name}</div>
          <div className='m-[5px]'>Gross Income: {emp?.gross}</div>
          <div className='m-[5px]'>Deduction: {emp?.deduction}</div>
          <div className='m-[5px]'>Net Income: {emp?.net}</div>

          <button onClick={handleVisible}  className='border w-[100px] m-auto' >Continue</button>
    </div>
  )

}

