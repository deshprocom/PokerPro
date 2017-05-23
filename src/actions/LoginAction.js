/**
 * Created by lorne on 2016/12/23.
 */
import * as TYPTES from './ActionTypes';
import * as LoginService from '../services/AccountDao';

/*手机注册*/
export function registerByMobile(phone,vcode) {
     const body = {
         type:'mobile',
         mobile:phone,
         vcode:vcode
     };
     return (dispatch)=>{
         dispatch(registerDoing());
         LoginService.postRegister(body,(data)=>{
             dispatch(registerOK(data));
         },(error)=>{
             dispatch(registerFail(error));
         })
     }

}

/* 邮箱注册*/
export function registerByEmail(email, password) {
    const body = {
        type:'email',
        email:email,
        password:password
    };
    return (dispatch)=>{
        dispatch(registerDoing());
        LoginService.postRegister(body,(data)=>{
            dispatch(registerOK(data));
        },(error)=>{
            dispatch(registerFail(error));
        })
    }
}

export function loginByMobile(phone, vcode) {
    const body = {
        type:'vcode',
        mobile:phone,
        vcode:vcode
    };
    return (dispatch)=>{
        dispatch(registerDoing());
        LoginService.postLoginByMobile(body,(data)=>{
            dispatch(registerOK(data));
        },(error)=>{
            dispatch(registerFail(error));
        })
    }
}

function registerDoing() {
    return {
        type:TYPTES.REGISTER_DOING
    }
}

function registerOK(data) {
    return{
        type:TYPTES.REGISTER_OK,
        data:data
    }
}

function registerFail(error) {
    return{
        type:TYPTES.REGISTER_FAIL,
        error:error
    }
}


export function fetchLogin(body) {
    console.log('fetchLogin opt')
   return (dispatch) =>{
       dispatch(doingLogin());

   }
    
}



function doingLogin() {
    return {
        type:TYPTES.LOGGED_DING,
    }
}

function loginIn(user) {
    return{
        type:TYPTES.LOGGED_IN,
        user:user,
        isLoginIn:true
    }
}