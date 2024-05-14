export const getAplications = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const response = [
        {
          name: "cart",
          entrypoint: "http://localhost:4173/assets/remoteEntry.js",
        },
        {
          name: "products",
          entrypoint: "http://localhost:4173/assets/remoteEntrys.js",
        }
      ];

      resolve(response);
    }, 200)
  );
