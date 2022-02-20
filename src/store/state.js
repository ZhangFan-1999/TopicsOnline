import { loadUserInfo,loadToken } from "../utils/index"
const state = {
  user:loadUserInfo(),
  token:loadToken(),
  comments:[]
}

export default state