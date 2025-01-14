import React, {useState} from 'react'
import { Button } from '../../components';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../apis';
import { toast } from 'react-toastify';
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const {token} = useParams()

    const handleForotPassword = async()=>{
        const response =  await apiResetPassword({password, token})
        if (response.success) {
            // setIsFogotPasswordl(false)
            toast.success(response.mes, { theme: "colored" })
          } else {
            toast.info(response.mes, { theme: "colored" });
          }
    }
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-50 bg-white flex flex-col items-center py-8 ">
    <div className="flex flex-col gap-4">
      <label htmlFor="password">Vui lòng nhập mật khẩu mới: </label>
      <input
        type="text"
        id="password"
        className="w-[800px] p-4 border-b outline-none placeholder:text-sm"
        placeholder="Anhyeuem1@"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center justify-end w-full gap-4">
        <Button
          style="px-4 py-2 rounded-md text-white bg-blue-500 font-semibold my-2"
          name="Submit"
          handleOnClick={handleForotPassword}
        />
      </div>
    </div>
  </div>
  )
}

export default ResetPassword