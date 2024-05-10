declare type MFERemoteConfigExposes = {
  pages: string[];
  components: string[];
  stores: string[];
};

declare type MFERemoteConfig = {
  name: string;
  exposes: MFERemoteConfigExposes;
};
