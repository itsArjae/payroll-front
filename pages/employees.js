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

