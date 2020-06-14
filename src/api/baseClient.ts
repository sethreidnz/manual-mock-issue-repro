export class BaseClient {
  /* this is performed before every call to the BFF */
  protected transformOptions = async (requestInit: RequestInit) => {
    return requestInit;
  };

  /* this is performed AFTER every call to the BFF */
  protected transformResult = async (
    url: string,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processor: (response: Response) => Promise<any>
  ) => {
    if (response.status === 404) {
      return null;
    }
    return processor(response);
  };

  protected getBaseUrl = (url: string, override: string | undefined): string =>
    override
      ? override
      : process.env.API_ROOT || "BaseClient API_ROOT not set.";
}
