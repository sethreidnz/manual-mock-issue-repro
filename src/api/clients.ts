import { BaseClient } from "./baseClient";

export interface AppDetailDto {
  appId: string;
}

export class AppsClient extends BaseClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = this.getBaseUrl("", baseUrl);
  }

  getAppDetail(appId: string): Promise<AppDetailDto> {
    let url_ = this.baseUrl + "/api/apps/{appId}/detail";
    if (appId === undefined || appId === null)
      throw new Error("The parameter 'appId' must be defined.");
    url_ = url_.replace("{appId}", encodeURIComponent("" + appId));
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    } as RequestInit;

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.transformResult(url_, _response, (_response: Response) =>
          this.processGetAppDetail(_response)
        );
      });
  }

  protected processGetAppDetail(response: Response): Promise<AppDetailDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as AppDetailDto);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<AppDetailDto>(null as any);
  }
}

export class SwaggerException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isSwaggerException = true;

  static isSwaggerException(obj: any): obj is SwaggerException {
    return obj.isSwaggerException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any {
  if (result !== null && result !== undefined) throw result;
  else throw new SwaggerException(message, status, response, headers, null);
}
