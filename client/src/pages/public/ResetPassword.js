import React, {useState} from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis/user'
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  // ở chỗ path định nghĩa là :token thì ở đây mới lấy được token
  const { token } = useParams();

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token})
    if(response.success) {
      toast.success(response.mes, { theme: 'colored'})
    }else {
      toast.info(response.mes, { theme: 'colored'})
    }
  }

  return (
    <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50">
    <div className="flex flex-col gap-4">
      <label htmlFor="password">Enter Your Password:</label>
      <input
        type="password"
        id="password"
        className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
        placeholder="Type here"
        value={password}
        onChange={e=> setPassword(e.target.value)}
      />
      <div className="flex items-center justify-center mt-4 w-full gap-4">
        <Button name="Submit" handleOnClick={handleResetPassword} style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2' />
      </div>
    </div>
  </div>
  )
}

export default ResetPassword