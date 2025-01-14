import React, { useEffect, useState } from 'react'

const useDebounce = (value, ms) => {

    const [decounceValue, setDecounceValue] = useState('')
    useEffect(() => {

        const setTimeOutId = setTimeout(() => {
            setDecounceValue(value)
        }, ms)

        return () => {
            clearTimeout(setTimeOutId)
        }

    }, [value, ms])

    return decounceValue
}

export default useDebounce


// muốn: khi mà nhập thay đổi giá thì sẽ gọi api gọi api liên tục theo mỗi lượt nhập chỉ call api khi mà người dùng nhập xong thời gian onchange
// tách price thành 2 biến biến để phục vụ UI, gõ tới đâu thì lưu tới đó => UI renderbiến thứ dùng qđ call api => settimeout => biến sẽ gán sau 1 khoản thời gian