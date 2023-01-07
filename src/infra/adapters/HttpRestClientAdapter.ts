import axios from "axios";
import HttpRestClient, { HttpRestClientConfig, HttpRestClientResponse } from "../HttpRestClient";

export default class HttpRestClientAdapter implements HttpRestClient {
  httpLib: any;

  constructor() {
    this.httpLib = axios;
  }

  async post<T = any, R = HttpRestClientResponse<T>, D = any>(
    url: string,
    data: D,
    config?: HttpRestClientConfig,
  ): Promise<R> {
    if (!config) return await this.httpLib.post(url, data, config);
    return await this.httpLib.post(url, data);
  }

  async get<T = any, R = HttpRestClientResponse<T>>(
    url: string,
    config?: HttpRestClientConfig,
  ): Promise<R> {
    if (!config) return await this.httpLib.post(url);
    return await this.httpLib.post(url, config);
  }
}
