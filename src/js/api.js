import axios from "axios";
axios.defaults.baseURL = `https://pixabay.com/api/?`;
let currentPage = 1;

const searchParams = new URLSearchParams({
  key:'38665853-fe99969bd23bb921fc896ab74',
  image_type: 'photo',
  orientation:'horizontal',
  safesearch: true,
per_page: 40, 
page: currentPage
});
async function axiosPhotos(){try
    {const response = await axios('',{params:searchParams})
    return response.data
  }
  catch (error) {
    throw new Error('Error fetching images:', error);
  }
}
export {axiosPhotos, searchParams}