import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import React from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
export default function Header() {
  return (
    
      <div className='flex flex-row items-center content-center bg-[#EFEAD8] p-[5px] ' > 
     <div className='flex flex-row items-center content-center ' >
        <img src="/images/logo.png" className='h-[60px]'  />
        <div className='font-serif text-[45px]' >PAYROLL</div>
     </div> 
    <div className='ml-auto' >
    <CDropdown>
        
        <CDropdownToggle color="cui-red" >Admin</CDropdownToggle>
        <CDropdownMenu>
        <CDropdownItem href="/result">EMPLOYEES</CDropdownItem>
          <CDropdownItem href="add-data">ADD DATA</CDropdownItem>
          <CDropdownItem href="/login">LOGOUT</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
    </div>
   
  )
}
