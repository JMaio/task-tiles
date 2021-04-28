import OpenAPIClientAxios from 'openapi-client-axios';


// handles CSRF token for communicating with Django
// https://www.techiediaries.com/django-react-forms-csrf-axios/
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// const server = {
//   // "url": "",
//   "description": "Development server"
// }

const api = new OpenAPIClientAxios({ 
  definition: '/api/v1/openapi.json',
  // withServer: server,
});

export default api;
