
import axios from 'axios';
import { error, loader} from './index';
axios.defaults.headers.common['x-api-key'] = 'live_flQsdmawXVHOEszZKd0VDFO3Nlsnte0OFf9SJwDCYz8Cq2lt0EpZwPMk51cGmD3e';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1'

const fetchBreeds = () =>axios('/breeds')
.then(resp => { loader.hidden = true; return resp.data})
.catch((err)=> console.log(err.message))
const fetchCatByBreed = (breedId) => axios(`/images/search?breed_ids=${breedId}`)
.then(resp => resp.data).catch((err)=> console.log(err.message))
export {fetchBreeds, fetchCatByBreed}