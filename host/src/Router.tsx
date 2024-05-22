import { useEffect, useState } from "react";
import { getAplications } from "./api-mock";
import {Button} from '@denis/ds'
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  __federation_method_setRemote,
  __federation_method_getRemote,
} from "virtual:__federation__";

// Define tipos
type ResponseAplication = {
  name: string;
  entrypoint: string;
  path: string;
};

type Application = {
  name: string;
  path: string;
  routes: RouteObject[];
};

enum ErrorType {
  NotFound,
  Error,
}

const NotFound = () => (
  <div style={{ color: "red" }}>
    <h2>404 - Página Não Encontrada</h2>
    <p>A página solicitada não pôde ser encontrada.</p>
  </div>
);

const ErrorComponent = () => (
  <div style={{ color: "red" }}>
    <h1>Erro: Falha ao carregar aplicação</h1>
  </div>
);

const Loading = () => (
  <div style={{ color: "blue" }}>
    <h1>Carregando...</h1>
  </div>
);

const importRemoteRoutes = async ({
  name,
  entrypoint,
}: {
  name: string;
  entrypoint: string;
}) => {
  __federation_method_setRemote(name, {
    url: () => Promise.resolve(entrypoint),
    format: "esm",
    from: "vite",
  });

  return await __federation_method_getRemote(name, "/routes");
};

const Router = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataApps, setDataApps] = useState<ResponseAplication[] | null>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const remoteApplications =
        (await getAplications()) as ResponseAplication[];

        setDataApps(remoteApplications);

        console.log(remoteApplications)

        const LOGIN_PATH = "/login";
        const isLoggedIn = window.localStorage.getItem("ac-token");
        if (!isLoggedIn && window.location.pathname !== LOGIN_PATH) {
          return window.location.replace(LOGIN_PATH);
        }
        if (isLoggedIn && window.location.pathname === LOGIN_PATH) {
          return window.location.replace('/');
        }


        const currentPath = window.location.pathname;
        const matchedApp = remoteApplications.find((app) =>
          new RegExp(`${app.path}\\b`).test(currentPath)
        );

        if (!matchedApp) {
          setError(ErrorType.NotFound);
          setLoading(false);
          return;
        }

        const routes = await importRemoteRoutes(matchedApp);
        const app: Application = {
          name: matchedApp.name,
          path: matchedApp.path,
          routes: routes.default as RouteObject[],
        };

        setApplication(app);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar aplicações:", error);
        setError(ErrorType.Error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <Loading />;
  if (error === ErrorType.Error) return <ErrorComponent />;
  if (error === ErrorType.NotFound)
    return (
      <RouterProvider
        router={createBrowserRouter([
          { path: "*", element: <NotFound /> },
          {
            path: "/",
            element: (
              <>
                <h1>HOST APP</h1>
                <Button label="teste"/>
                {dataApps?.map((item) => <div key={item.name}><a href={item.path}>/{item.name}</a><br/></div>)}
              </>
            ),
          },
        ])}
      />
    );

  if (application) {
    const { routes, path } = application;
    return (
      <RouterProvider
        router={createBrowserRouter(routes, { basename: path })}
      />
    );
  }
};

export default Router;
