import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProfileQuery } from "../generated/graphql";

export const useIsAuth = (redirectPath?: string) => {
  const [{data, fetching}] = useProfileQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.profile) {
      router.replace(`/login?redirect=${redirectPath}`)
    }
  }, [data, router, fetching]);
};