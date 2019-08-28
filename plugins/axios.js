import axios from '@nuxtjs/axios';

export default axios.create({
  baseURL: process.env.TOSHOKAN_BASE_URL,
});
