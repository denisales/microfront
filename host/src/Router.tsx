import { useEffect, useState } from "react";
import { getAplications } from "./api-mock";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  __federation_method_setRemote,
  __federation_method_getRemote,
} from "virtual:__federation__";

// Function to import remote routes
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

// Define types
type ResponseAplications = {
  name: string;
  entrypoint: string;
};

type Application = {
  name: string;
  routes: RouteObject[];
};

enum ErrorType {
  NotFound,
  Error,
}

const NotFound = () => (
  <div style={{ color: "red" }}>
    <h2>404 - Page Not Found</h2>
    <p>The requested page could not be found.</p>
  </div>
);

const Error = () => (
  <div style={{ color: "red" }}>
    <h1>Error: Falha ao carregar aplicação</h1>
  </div>
);

const Loading = () => (
  <div style={{ color: "blue" }}>
    <h1>Loading...</h1>
  </div>
);

// Router component
const Router = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Get list of remote applications
        const remoteApplications =
          (await getAplications()) as ResponseAplications[];

          console.log(remoteApplications)

        const currentPath = window.location.pathname;

        // Find the matching application based on the current URL
        const matchedApp = remoteApplications.find((app) =>
          new RegExp(`/${app.name}\\b`).test(currentPath)
        );

        if (!matchedApp) {
          setError(ErrorType.NotFound);
          setLoading(false);
          return;
        }

        // Import routes for the matched application
        const routes = await importRemoteRoutes({
          name: matchedApp.name,
          entrypoint: matchedApp.entrypoint,
        }).then(response => response.default);

        console.log(routes)

        // Set the application state
        const app: Application = {
          name: matchedApp.name,
          routes,
        };

        setApplication(app);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError(ErrorType.Error);
        setLoading(false);
      }
    };

    // Call fetchApplications on component mount
    fetchApplications();
  }, []);

  // Render the RouterProvider with the application's routes
  if (loading) return <Loading />;
  if (error === ErrorType.NotFound) return <NotFound />;
  if (error === ErrorType.Error) return <Error />;

  if (application)
    return (
      <>
      <RouterProvider
      fallbackElement={<>FALLBACKKK</>}
        router={createBrowserRouter([...application.routes], {
          basename: `/${application.name}`,
        })}
      />
      </>
    );
};

export default Router;
