export type HttpRestClientConfig = {
  // `headers` are custom headers to be sent
  headers?: Record<string, string | number | boolean>;

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // browser only: 'blob'
  responseType?: string; // default - "json"

  // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding?: string; // default - "utf8"

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  baseURL?: string;

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout?: number; // default is `0` (no timeout)
};

export type HttpRestClientResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: any;
};

export default interface HttpRestClient {
  post<T = any, R = HttpRestClientResponse<T>, D = any>(
    url: string,
    data: D,
    config?: HttpRestClientConfig,
  ): Promise<R>;

  get<T = any, R = HttpRestClientResponse<T>>(
    url: string,
    config?: HttpRestClientConfig,
  ): Promise<R>;
}
