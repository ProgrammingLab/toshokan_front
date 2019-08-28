import axios from '@nuxtjs/axios';

const client = {
  client: axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
  }),
  async requestBookInformation(isbn) {
    const resp = await this.client.get(`/${isbn}`);
    return resp.data;
  },
};

export default client;
