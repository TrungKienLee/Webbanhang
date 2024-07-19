import React , {useState, useCallback} from 'react'
import {InputField, Button} from'../../components'
import {apiRegister , apiLogin} from '../../apis/user'
import Swal from 'sweetalert2'



const Login = () =>{

    const [payload, setPayload] = useState({
        email : '',
        password:'',
        firstname:'',
        lastname: '',
        mobile:''
    })
    const[isRegister, setIsRegister] = useState(false)
    const resetPayload = 
    const handleSubmit = useCallback(async() => {
        const {firstname, lastname,mobile,  ...data} =payload
        if(isRegister){
            const response = await apiRegister(payload)
            Swal.fire(response.success? 'Congratulation' : 'Oops!', response.mes, response.success? 'success' :'error' ).then(() =>{
                setIsRegister(false)

            })
        }
        else {
            const rs = await apiLogin(data)
            console.log(rs)
        }
        
    },[payload, isRegister])

    return (
        <div className ='w-screen h-screen relative'>
            <img src='https://hrchannels.com/uptalent/attachments/images/20230421/105829333_thuong-mai-dien-tu-4.png'
            alt=""
            className="w-full h-full object-cover"
            />
            <div className ='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'> 
                <div className ='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] '>
                <h1 className="text-[28px] font-semibold text-main mb-8 "> {isRegister? 'Register' : 'Login'}  </h1>
            {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey="firstname"
                // fullWidth
                // invalidFields={invalidFields}
                // setInvalidFieds={setInvalidFieds}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
                // fullWidth
                // invalidFields={invalidFields}
                // setInvalidFieds={setInvalidFieds}
              />
            </div>
          )}
                <InputField 
                value={payload.email}
                setValue={setPayload}
                nameKey='email'
                />
                 <InputField 
                value={payload.mobile}
                setValue={setPayload}
                nameKey='mobile'
                />
                  <InputField 
                value={payload.password}
                setValue={setPayload}
                nameKey="password"
                type="password"
                />
                <Button 
                name={isRegister ? 'Register' : 'Login'}
                handleOnClick={handleSubmit}
                fw

                />
                <div className ='flex w-full items-center justify-between my-2 text-sm'> 
                    {!isRegister &&  <span className ='text-blue-500 hover:underline cursor-pointer'> Forgot your account</span>}
                    {!isRegister &&  <span 
                    className ='text-blue-500 hover:underline cursor-pointer'
                    onClick={() => setIsRegister(true)}
                    > Create account</span>}
                    {isRegister &&  <span 
                    className ='text-blue-500 hover:underline cursor-pointer w-full text-center'
                    onClick={() => setIsRegister(false)}
                    > Go login </span>}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login