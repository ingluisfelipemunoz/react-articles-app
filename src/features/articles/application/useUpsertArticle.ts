export function useUpsertArticle() {
  return {
    mutate: (_payload: unknown) => {
      console.log(_payload);
    },
    isPending: false,
  };
}
