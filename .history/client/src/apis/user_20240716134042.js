import axios from '../axios'

export const apiRegister = (data) => axios({
    url: '/user',
    method: 'get'
})