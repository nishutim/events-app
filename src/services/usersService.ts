import $axios from '../http';
import { IUser } from '../models';

class UsersService {
   static fetchUsers = async () => {
      const { data } = await $axios.get<IUser[]>('');
      return data;
   }
}

export default UsersService;