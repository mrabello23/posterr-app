export default interface Database {
  query(query: string, params: any): Promise<any>;
  close(): Promise<any>;
}
