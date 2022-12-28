import axios from "axios";
import {dataType, signOut} from "../redux/auth-reduser";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "fda9637c-5329-4353-928c-78e8666bfa40"
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10 ) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      })
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
  getProfileInfo(userId: number) {
    console.log('Измени код, обратись к profileAPI вместо usersAPI')
    return profileAPI.getProfileInfo(userId);
  },
}

export const authAPI = {
  getUserInfo() {
    return instance.get('auth/me');
  },
  signIn(userLoginData: any) {
    return instance.post('auth/login', {email: userLoginData.email, password: userLoginData.password, rememberMe: userLoginData.rememberMe});
  },
  signOut() {
    return instance.delete('auth/login');
  }
}

export const profileAPI = {
  getProfileInfo(userId: number) {
    return instance.get(`profile/${userId}`)
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, {status: status})
  },

  // getUserInfo() {
  //   return instance.get('auth/me')
  // }
}

