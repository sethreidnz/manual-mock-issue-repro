import React, { useState, useEffect } from "react";
import "./App.css";

import { AppsClient, AppDetailDto } from "./api/clients";

type AppProps = {
  appId: string;
};

const App: React.FC<AppProps> = ({ appId }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [appDetail, setAppDetail] = useState<AppDetailDto | null>(null);

  useEffect(() => {
    const getAppDetail = async (appId: string) => {
      try {
        setHasLoaded(false);
        const result = await new AppsClient().getAppDetail(appId);
        setAppDetail(result);

        setHasLoaded(true);
      } catch (error) {}
    };
    if (!hasLoaded) {
      getAppDetail(appId);
    }
  }, [appId, hasLoaded]);

  if (!hasLoaded) {
    return <>Loading</>;
  } else if (!appDetail) {
    return <>App not found</>;
  }

  return <>App found with id '{appDetail.appId}'</>;
};

export default App;
