import { BaseClient } from "./baseClient";

export interface AppDetailDto {
  appId: string;
}

export class AppsClient extends BaseClient {
  getAppDetail(appId: string): Promise<AppDetailDto> {
    return Promise.resolve({ appId });
  }
}