export interface navigationInterface {
  navigation: {
    navigate: (name: string, params?: any) => void;
    goBack: () => void;
    dispatch: () => void;
    toggleDrawer: () => void;
  };
  route?: {key: string; name: string; params: {list: string}; path: null};
}
