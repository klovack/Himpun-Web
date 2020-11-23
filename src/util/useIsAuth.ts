import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProfileQuery } from "../generated/graphql";

export const useIsAuth = (redirectPath?: string, reverse = false) => {
  const [{data, fetching}] = useProfileQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.profile && !reverse) {
      router.replace(`/login?redirect=${redirectPath}`);
    } else if (!fetching && data?.profile && reverse) {
      router.replace('/');
    }
  }, [data, router, fetching]);
};