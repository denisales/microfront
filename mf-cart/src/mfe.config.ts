export const config: MFERemoteConfig = {
  name: "cart",
  exposes: {
    pages: ["./src/pages/Cart.tsx"],
    components: [],
    stores: ["./src/store/cartStore.ts"],
  },
};
