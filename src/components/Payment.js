import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import axios from 'axios'
import { LoginContext } from '../context/LoginContext'


const Payment = () => {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')
    const [focus, setFocus] = useState('')
    const {cart, clearCart}= useContext(CartContext)
    const {currentUser,forceRender,setForceRender} = useContext(LoginContext)

    async function saveToCart (){
      let arr=[];
      for(let i=0;i<cart.length;i++){
        arr[i]=cart[i].attributes.title
      }
      console.log(arr);
      console.log(currentUser.username);
      let packedData={
        username:currentUser.username,
        cart:arr,
      }
      // ''
      await axios.post('http://localhost:8000/update',packedData).then(()=>console.log('updated cart'));
      clearCart();
      
      


    }

  return (
    <div className='flex justify-center '>
      <div className=' w-[300px] flex flex-col justify-center items-center pt-[200px] '>
        <form className='flex flex-col justify-center border-solid border-3 border-black'>
          <input className=' p-1 h-10 text-black' 
              type='tel'
              name='number'
              placeholder='card number'
              value={number}
              onChange={e=>setNumber(e.target.value)}
              onFocus={e=>setFocus(e.target.name)} />

          <input className=' border-lime-950 text-black p-1 h-12 ' 
              type=''
              name='name'
              placeholder='name'
              value={name}
              onChange={e=>setName(e.target.value)}
              onFocus={e=>setFocus(e.target.name)}
            />

            <input className=' border-none text-black p-1 h-10' 
              type=''
              name='expiry'
              placeholder='MM/YY'
              value={expiry}
              onChange={e=>setExpiry(e.target.value)}
              onFocus={e=>setFocus(e.target.name)}
            />

            <input className=' text-black p-1 h-10'
              type='password'
              name='cvv'
              placeholder='cvv'
              value={cvv}
              onChange={e=>setCvv(e.target.value)}
              onFocus={e=>setFocus(e.target.name)}
            />

              
        </form>
        <Link to='/login'>
//        <button className='text-black bg-yellow-500 w-[100px] m-2 rounded-md' onClick={()=>{
  saveToCart();
  setForceRender(forceRender+1);

  }}>pay</button>
//      </Link>

      </div>
      
    </div>
  )
}

export default Payment

// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'


// const Payment = () => {
//     const [number, setNumber] = useState('')
//     const [name, setName] = useState('')
//     const [expiry, setExpiry] = useState('')
//     const [cvv, setCvv] = useState('')
//     const [focus, setFocus] = useState('')

//   return (
//     <div className=' flex flex-col bg-slate-300'>
//       <div className='flex flex-col justify-center'>
//         <form className='flex flex-col justify-center shadow-xl pt-[200px] pb-[200px] w-[400px]'>
//           <input className='w-[200px] p-1 h-10 text-black' 
//             type='tel'
//             name='number'
//             placeholder='card number'
//             value={number}
//             onChange={e=>setNumber(e.target.value)}
//             onFocus={e=>setFocus(e.target.name)}
//           />

//           <input className='w-[200px] border-lime-950 text-black p-1 h-12 ' 
//             type=''
//             name='name'
//             placeholder='name'
//             value={name}
//             onChange={e=>setName(e.target.value)}
//             onFocus={e=>setFocus(e.target.name)}
//           />

//           <input className='w-[200px] border-none text-black p-1 h-10' 
//             type=''
//             name='expiry'
//             placeholder='MM/YY'
//             value={expiry}
//             onChange={e=>setExpiry(e.target.value)}
//             onFocus={e=>setFocus(e.target.name)}
//           />

//           <input className='w-[200px] text-black p-1 h-10'
//             type='tel'
//             name='cvv'
//             placeholder='cvv'
//             value={cvv}
//             onChange={e=>setCvv(e.target.value)}
//             onFocus={e=>setFocus(e.target.name)}
//           />


              
//         </form>
//         {/* <div className='w-[400px]'>
//             <Link to='/login'>
//               <button className='text-black '>pay</button>
//             </Link>

//         </div> */}

//       </div>    
      
//     </div>
//   )
// }

// export default Payment
