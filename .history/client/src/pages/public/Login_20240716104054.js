import React , {useState, useCallback} from 'react'
import {InputField, Button} from'../../components'
const Login = () =>{

    const [payload, setPayload] = useState({
        email : '',
        password:'',
        name:''
    })
    const handleSubmit = useCallback(() => {
        console.log(payload)
    },[payload])

    return (
        <div className ='w-screen h-screen relative'>
            <img src='https://hrchannels.com/uptalent/attachments/images/20230421/105829333_thuong-mai-dien-tu-4.png'
            alt=""
            className="w-full h-full object-cover"
            />
            <div className ='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'> 
                <div className ='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] '>
                <h1 className="text-[28px] font-semibold text-main mb-8 "> Login</h1>
                <InputField 
              value={payload.name}
              setValue={setPayload}
              nameKey='name'
              />
                <InputField 
                value={payload.email}
                setValue={setPayload}
                nameKey='email'
                />
                  <InputField 
                value={payload.password}
                setValue={setPayload}
                nameKey='password'
                type='password'
                />
                <Button 
                name='Login'
                handleOnClick={handleSubmit}
                fw

                />
                <div clasName ='flex w-full items-center justify-between my-2 text-sm'> 
                    <span className ='text-blue-500 hover:underline cursor-pointer'> Forgot your account</span>
                    <span className ='text-blue-500 hover:underline cursor-pointer'> Create account</span>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login