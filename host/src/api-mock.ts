export const getAplications = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const response = [
        {
          name: "cart",
          entrypoint: "http://localhost:4173/assets/remoteEntry.js",
          path: "/mfe-cart",
        },
        {
          name: "products",
          entrypoint: "http://localhost:4173/assets/remoteEntrys.js",
          path: "/mfe-products",
        },
        {
          name: "login",
          entrypoint: "http://localhost:4174/assets/remoteEntry.js",
          path: "/login",
        }
      ];

      resolve(response);
    }, 200)
  );
