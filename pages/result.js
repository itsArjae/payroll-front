import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverApi } from '../src/api/api';
import ReactPaginate from "react-paginate";
import Header from './header';
import Loader from '../src/loader/loader';
export default function result() {
  const [data,setData] = useState([]);
  const itemsPerPage = 5;
  const pagesVisited = 0;
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const DisplayItems = data
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((data) => {
      return (
        <div className='flex flex-row mt-[10px] border-b p-[5px] '  key={data.id}>
          <div className='w-[100%]' > {data.name}</div>
          <div className='w-[50%]'> {data.hours}</div>
          <div className='w-[50%]'> Php.{data.rate}</div>
          <div className='w-[50%]'> {data.days}</div>
          <div className='w-[50%]'> Php.{data.gross}</div>
          <div className='w-[50%]'> Php.{data.deduction}</div>
          <div className='w-[50%]'> Php.{data.net}</div>
        </div>
      );
    });


  const [done,setDone] = useState(false);
  useEffect(()=>{
      axios.get(`${serverApi}employees/fetch`).then((response)=>{
        setData(response.data);
        setDone(true);
      })
  },[])

  return done? (
    <div className=" flex items-center justify-center bg-main flex-col" >
     <div className='w-[100%] mb-auto ' >
      <Header/>
  
     </div>

     <div className='grow text-test ' >

    <div>
      <div className='mt-10 w-[900px] min-h-screen ' >
        <div className='flex flex-row w-[100%] mt-[10px] border-b ' >
          <div className='w-[100%] grow '>Name</div>
          <div className='w-[50%]'>Hrs/Day</div>
          <div className='w-[50%]'>Rate/Hr</div>
          <div className='w-[50%]'>Days</div>
          <div className='w-[50%]'>Gross</div>
          <div className='w-[50%]'>Deduction</div>
          <div className='w-[50%]'>Net Income</div>
        </div>
      {DisplayItems}
      </div>

      


    </div>

     </div>


      </div>
  ):<div className='w-screen h-screen bg-main flex items-center justify-center ' ><Loader/>  </div>
}
