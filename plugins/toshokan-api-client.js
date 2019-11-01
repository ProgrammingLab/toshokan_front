import axios from 'axios';

export default (_, inject) => {
  inject('toshokanClient', axios.create({
    baseURL: process.env.TOSHOKAN_BASE_URL,
  }));
};
