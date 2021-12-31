const url = 'https://localhost:5001/api/';

export const environment = {
  production: true,
  baseUrl: url,
  notShowLoad: [
    {url: `${url}account/checkemail`, method: 'GET'},
    {url: `${url}basket`, method: 'DELETE'},
    {url: `${url}orders`, method: 'POST'}
  ],
  publishableKey: ''
};
