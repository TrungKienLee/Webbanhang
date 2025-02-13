import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import Swal from 'sweetalert2'

const FinalRegister = () => {
    const { status } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(status === 'failed') Swal.fire('Lỗi!','Đăng ký không thành công','error').then(() => {
            navigate(`/${path.LOGIN}`)
        })
        if(status === 'success') Swal.fire('Chúc mừng!', 'Đăng ký tài khoản thành công!','success').then(() => {
            navigate(`/${path.LOGIN}`)
        })
    }, [])
    return (
        <div className='h-screen w-screen bg-gray-100'>abcd</div>
    )
}

export default FinalRegister
// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import path from '../../ultils/path';
// import Swal from 'sweetalert2';

// const FinalRegister = () => {
//     const { status } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const handleAlert = async () => {
//             if (status === 'failed') {
//                 await Swal.fire('Lỗi!', 'Đăng ký không thành công', 'error');
//                 navigate(`/${path.LOGIN}`);
//             }
//             if (status === 'success') {
//                 await Swal.fire('Chúc mừng!', 'Đăng ký tài khoản thành công!', 'success');
//                 navigate(`/${path.LOGIN}`);
//             }
//         };

//         handleAlert();
//     }, [status, navigate]);

//     return (
//         <div className='h-screen w-screen bg-gray-100'></div>
//     );
// };

// export default FinalRegister;
