import React, { useState, useCallback } from 'react';
import { InputField, Button } from '../../components';
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify'
import { validate } from '../../ultils/helpers';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
    });

    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        });
    };

    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
       
        // Hiển thị thông báo dựa trên phản hồi của API
        if (response.success) {
           toast.success(response.mes, {theme: 'colored'})
        } else {
           toast.info(response.mes, {theme: 'colored'})
        }
    };


    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload;
        if (isRegister) {
            const response = await apiRegister(payload);
            if (response.success) {
                Swal.fire('Congratulation', response.mes, 'success').then(() => {
                    setIsRegister(false);
                    resetPayload();
                });
            } else {
                Swal.fire('Oops!', response.mes, 'error');
            }
        } else {
            const rs = await apiLogin(data);
            if (rs.success) {
                dispatch(login({ user: rs.user, token: rs.token }));
                navigate(`/${path.HOME}`);
            } else {
                Swal.fire('Oops!', rs.mes, 'error');
            }
        }
    }, [payload, isRegister, dispatch, navigate]);

    return (
        <div className='w-screen h-screen relative'>
            {isForgotPassword && (
                <div className='absolute animate-slide-right top-0 left-0 bottom-0 right-0 flex flex-col items-center py-8 z-50 bg-white'>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor='email'>Enter your email</label>
                        <input
                            type='text'
                            id='email'
                            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
                            placeholder='Exp: email@gmail.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className='flex items-center justify-end mt-4 gap-4'>
                            <Button
                                name='Submit'
                                handleOnClick={handleForgotPassword}
                                style='bg-blue-600 rounded px-4 py-2 text-white'
                            />
                            <Button
                                name='Back'
                                handleOnClick={() => setIsForgotPassword(false)}
                                style='bg-main rounded px-4 py-2 text-white'
                            />
                        </div>
                    </div>
                </div>
            )}
            {!isForgotPassword && (
                <>
                    <img
                        src='https://hrchannels.com/uptalent/attachments/images/20230421/105829333_thuong-mai-dien-tu-4.png'
                        alt=''
                        className='w-full h-full object-cover'
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
                        <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]'>
                            <h1 className='text-[28px] font-semibold text-main mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
                            {isRegister && (
                                <div className='flex items-center gap-2'>
                                    <InputField
                                        value={payload.firstname}
                                        setValue={setPayload}
                                        nameKey='firstname'
                                    />
                                    <InputField
                                        value={payload.lastname}
                                        setValue={setPayload}
                                        nameKey='lastname'
                                    />
                                </div>
                            )}
                            <InputField
                                value={payload.email}
                                setValue={setPayload}
                                nameKey='email'
                            />
                            {isRegister && (
                                <InputField
                                    value={payload.mobile}
                                    setValue={setPayload}
                                    nameKey='mobile'
                                />
                            )}
                            <InputField
                                value={payload.password}
                                setValue={setPayload}
                                nameKey='password'
                                type='password'
                            />
                            <Button
                                name={isRegister ? 'Register' : 'Login'}
                                handleOnClick={handleSubmit}
                                fw
                            />
                            <div className='flex w-full items-center justify-between my-2 text-sm'>
                                {!isRegister && (
                                    <span onClick={() => setIsForgotPassword(true)} className='text-blue-500 hover:underline cursor-pointer'>
                                        Forgot your account
                                    </span>
                                )}
                                {!isRegister && (
                                    <span
                                        className='text-blue-500 hover:underline cursor-pointer'
                                        onClick={() => setIsRegister(true)}
                                    >
                                        Create account
                                    </span>
                                )}
                                {isRegister && (
                                    <span
                                        className='text-blue-500 hover:underline cursor-pointer w-full text-center'
                                        onClick={() => setIsRegister(false)}
                                    >
                                        Go login
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;






// import React , {useState, useCallback} from 'react'
// import {InputField, Button} from'../../components'
// import {apiRegister , apiLogin , apiForgotPassword} from '../../apis/user'
// import Swal from 'sweetalert2'
// import {useNavigate } from 'react-router-dom'
// import path from '../../ultils/path'
// import {login} from '../../store/user/userSlice'
// import {useDispatch} from 'react-redux'


// const Login = () =>{
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
    
//     const [payload, setPayload] = useState({
//         email : '',
//         password:'',
//         firstname:'',
//         lastname: '',
//         mobile:''
//     })
    
//     const [isForgotPassword, setIsForgotPassword] = useState(false)
//     const[isRegister, setIsRegister] = useState(false)
//     const resetPayload = ()=> {
//         setPayload ({
//             email : '',
//         password:'',
//         firstname:'',
//         lastname: '',
//         mobile:''
//         })
//     }
//     const [email, setEmail] = useState('')
//     const handleForgotPassword = async() =>{
//         const response = await apiForgotPassword({email})
//         console.log(response)
//     }
//     const handleSubmit = useCallback(async() => {
//         const {firstname, lastname,mobile,  ...data} =payload
//         if(isRegister){
//             const response = await apiRegister(payload)
//             if(response.success){
//                 Swal.fire('Congratulation' , response.mes,  'success'  ).then(() =>{
//                 setIsRegister(false)
//                 resetPayload()
//             })
//             }
//             else Swal.fire('Oops!', response.mes, 'error' )
            
            
//         }
//         else {
//             const rs = await apiLogin(data)
//             if(rs.success){
//                navigate(`/${path.HOME}`)
//             }
//             else Swal.fire('Oops!', rs.mes, 'error' )
//         }
        
//     },[payload, isRegister])

//     return (
//         <div className ='w-screen h-screen relative'>
//            {isForgotPassword &&  <div className = 'absolut animate-slide-right top-0 left-0 bottom-0 right-0 flex flex-col items-center py-8 z-50 bg-white'> 
//                 <div className='flex flex-col gap-4'> 
//                     <label htmlFor='email'> Enter your email: </label>
//                     <input 
//                     type = 'text' 
//                     id='email' 
//                     className = 'w-[800px] pb-2 border-b outline-none placeholer:text-sm'
//                     placeholder='Exp : email@gmail.com'
//                     value ={email}
//                     onChange={e => setEmail(e.target.value)}
//                     /> 
//                 <div className='flex items-center justify-end mt-4 gap-4'> 
//                     <Button 
//                     name = 'Submit'
//                     handleOnClick={handleForgotPassword}
//                     style = 'bg-blue-600 rounded px-4 py-2 text-white   '
//                     />
//                     <Button 
//                     name = 'Back'
//                     handleOnClick={() => setIsForgotPassword(false)}
//                     style = 'bg-main rounded px-4 py-2 text-white'
//                     />
//                     </div>
//                 </div>
//                 </div> 
//                 }
                 
//             <img src='https://hrchannels.com/uptalent/attachments/images/20230421/105829333_thuong-mai-dien-tu-4.png'
//             alt=""
//             className="w-full h-full object-cover"
//             />
//             <div className ='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'> 
//                 <div className ='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] '>
//                 <h1 className="text-[28px] font-semibold text-main mb-8 "> {isRegister? 'Register' : 'Login'}  </h1>
//             {isRegister && (
//             <div className="flex items-center gap-2">
//               <InputField
//                 value={payload.firstname}
//                 setValue={setPayload}
//                 nameKey="firstname"
//                 // fullWidth
//                 // invalidFields={invalidFields}
//                 // setInvalidFieds={setInvalidFieds}
//               />
//               <InputField
//                 value={payload.lastname}
//                 setValue={setPayload}
//                 nameKey="lastname"
//                 // fullWidth
//                 // invalidFields={invalidFields}
//                 // setInvalidFieds={setInvalidFieds}
//               />
//             </div>
//           )}
//                 <InputField 
//                 value={payload.email}
//                 setValue={setPayload}
//                 nameKey='email'
//                 />
//                 {
//                 isRegister &&   <InputField 
//                 value={payload.mobile}
//                 setValue={setPayload}
//                 nameKey='mobile'
//                 />
//                 }
//                   <InputField 
//                 value={payload.password}
//                 setValue={setPayload}
//                 nameKey="password"
//                 type="password"
//                 />
//                 <Button 
//                 name={isRegister ? 'Register' : 'Login'}
//                 handleOnClick={handleSubmit}
//                 fw

//                 />
//                 <div className ='flex w-full items-center justify-between my-2 text-sm'> 
//                     {!isRegister &&  <span onClick = {() => setIsForgotPassword(true) } className ='text-blue-500 hover:underline cursor-pointer'> Forgot your account</span>}
//                     {!isRegister &&  <span 
//                     className ='text-blue-500 hover:underline cursor-pointer'
//                     onClick={() => setIsRegister(true)}
//                     > Create account</span>}
//                     {isRegister &&  <span 
//                     className ='text-blue-500 hover:underline cursor-pointer w-full text-center'
//                     onClick={() => setIsRegister(false)}
//                     > Go login </span>}
//                 </div>
//             </div>
//             </div>
//         </div>
//     )
// }

// export default Login