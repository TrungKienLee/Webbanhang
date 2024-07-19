import axios from '../axios'

export const apiRegister = () => axios({
    url: '/prodcategory/',
    method: 'get'
})