import axios from '../axios'

export const apiRegister = (data) => axios({
    url: '/prodcategory/',
    method: 'get'
})