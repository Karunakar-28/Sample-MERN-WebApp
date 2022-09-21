import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'


//make api call
export const userLoginLifeCycle = createAsyncThunk("login",async(userCredObj,{rejectWithValue})=>{
    let res = await axios.post("http://localhost:4000/users/login",userCredObj)

    console.log("res is ",res)

    if(res.data.message==='success'){
        //save token in localStore / session storage
        localStorage.setItem("token",res.data.token)
        return res.data
    }
    else{
        return rejectWithValue(res.data.message)
    }
})

export const userLoginSlice = createSlice({
    name : "login",
    initialState:{
        userObj: {},
        isPending: false,
        isSuccess: false,
        isError: false,
        errMsg: ""
    },
    reducers: {
        clearState:(state,action)=>{
            state.userObj={};
            state.isPending=false;
            state.isSuccess=false;
            state.isError=false;
            state.errMsg= "";
        }
    },
    extraReducers:{
        [userLoginLifeCycle.pending]:(state,action)=>{
            console.log("inPending action",action)
            state.isPending=true
            state.isSuccess=false
            state.isError=false
            state.errMsg=''
            state.userObj={}
        },

        [userLoginLifeCycle.fulfilled]:(state,action)=>{
            console.log("in success action",action)
            state.isPending=false
            state.isSuccess=true
            state.isError=false
            state.errMsg=''
            state.userObj=action.payload.user
        },

        [userLoginLifeCycle.rejected]:(state,action)=>{
            console.log(" in rejected action",action)
            state.isPending=false
            state.isSuccess=false
            state.isError=true
            state.errMsg=action.payload
            state.userObj={}
        }
    }

})

//create action creator function
export const {clearState} = userLoginSlice.actions

export default userLoginSlice.reducer