import { API_URL } from "./config"
import axios from 'axios';

class AuthService {

  async register(username: string, pass : string, passConfirmation: string) {
    const body = 
    {
        username,
        pass,
        passConfirmation
    };

    const res = await axios.post(API_URL + '/user/register', body)
    
    return res.data
  }
  
  async login(username: string, pass: string) {
    const body = { username, pass };
    const res = await axios.post(API_URL + '/user/login', body);
    return res.data;
  }
}

export const authService = new AuthService()

