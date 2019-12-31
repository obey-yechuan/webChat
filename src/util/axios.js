import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL="http://127.0.0.1:3000"
axios.defaults.transformRequest = function(data){
    return qs.stringify(data)
}

export default axios