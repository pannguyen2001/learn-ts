type RequestHeaderConfigModel = {
    method: string;
    baseURL: string;
    headers?: object;
    params?: object;
    data?: object;
    transformRequest?: any;
    transformResponse?: any;
    timeout?: number;
    withCredentials?: boolean;
  };
  
  export default RequestHeaderConfigModel;
  