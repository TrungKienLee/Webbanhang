import React , {useState} from 'react'
import {InputField} from'../../components'
const Login = () =>{

    const [payload, setPayload] = useState({
        email : '',
        password:'',
        name:''
    })

    return (
        <div className ='w-screen h-screen relative'>
            <img src='https://hrchannels.com/uptalent/attachments/images/20230421/105829333_thuong-mai-dien-tu-4.png'
            alt=""
            className="w-full h-full object-cover"
            />
            <div className ='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'> 
                <div className ='p-8 bg-white rounded-md min-w-[500px] '>
                <h1 className="text-[28px] font-semibold "> Login</h1>
                <InputField 
                value={payload.email}
                setValue={setPayload}
                nameKey
                />
            </div>
            </div>
        </div>
    )
}

export default Login