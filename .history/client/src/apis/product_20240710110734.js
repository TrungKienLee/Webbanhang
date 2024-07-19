import axios from '../axios'

export const apiGetProducts = () => axios({
    url: '/prodcategory/',
    method: 'get'
})