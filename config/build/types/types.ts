export enum WebpackMode {
  Prod = "production",
  Dev = "development",
}
export type ConfigEnv = {
  mode: WebpackMode;
  port: number;
  analyzer: boolean;
  paths: Paths;
};
export type Paths = {
  output: string;
  entry: string;
  public: string;
};
