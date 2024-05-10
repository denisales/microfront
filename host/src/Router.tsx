/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  __federation_method_setRemote,
  __federation_method_getRemote,
} from "virtual:__federation__";

import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

const useMFEData = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    async function handleFetch() {
      setLoading(true);
      const response = await fetch(
        "https://66290ba654afcabd0737f93b.mockapi.io/api/mfe"
      );
      if (response.ok) {
        const data = await response.json();
        // setPages(data);
        setLoading(false);
        console.log(data);
        setData(data);
      }
    }
    handleFetch();
  }, []);

  return { data, loading };
};

type RemoteAppProps = {
  scope: string;
  entrypoint: string;
  page: string;
};

const RemoteApp = ({ scope, entrypoint, page }: RemoteAppProps) => {
  __federation_method_setRemote(scope, {
    url: () => Promise.resolve(entrypoint),
    format: "esm",
    from: "vite",
  });

  return lazy(() => __federation_method_getRemote(scope, page));
};

const Router = () => {
  const { data } = useMFEData();

  const [mfeList, setMfeList] = useState<any>([]);

  useEffect(() => {
    if (!data?.length) return;

    const components = data.map((mfe: any) =>
      RemoteApp({
        scope: mfe.scope,
        entrypoint: mfe.entrypoint,
        page: mfe.pages[0],
      })
    );

    setMfeList(components);
  }, [data]);

  return (
    <Suspense>
      <Routes>
        {mfeList?.length &&
          mfeList.map((Component: any, index: any) => (
            <Route
              key={index}
              path={`${data?.length && data[index].path}`}
              element={
                <>
                  <Component />
                </>
              }
            />
          ))}
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </Suspense>
  );
};

export default Router;
