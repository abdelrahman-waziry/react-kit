import { combineReducers } from 'redux'
import auth from '../admin/modules/auth/store/reducer'
import home from '../admin/modules/home/store/reducer'

export default combineReducers({ auth, home })
