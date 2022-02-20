import * as types from '@/store/mutationTypes'
import { saveUserInfo,clearUserInfo,setUserToken } from '../utils/index'

export const setCurrentUser=function(ctx,data){
  ctx.commit(types.SET_USER,saveUserInfo(data))
}

export const delCurrentUser=function(ctx,data){
  ctx.commit(types.SET_USER,clearUserInfo())
}

export const setToken=function(ctx,data){
  ctx.commit(types.SET_TOKEN,setUserToken(data))
}

export const setComment=function(ctx,data){
  ctx.commit(types.SET_COMMENT,data)
}


