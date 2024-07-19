import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'
export const getNewProducts = createAsyncThunk('product/', async(data, {rejectWithValue}) => {
    const response = await apis.apiGetCategories();
    // console.log(response)
    if(!response.success) return rejectWithValue(response)
    return response.prodCategories
})


