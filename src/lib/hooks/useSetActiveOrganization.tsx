/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useOrganization, useOrganizationList, useUser } from "@clerk/nextjs";

export const useSetActiveOrganization = () => {
  const [loading, setLoading] = useState(true);
  const [noOrgFound, setNoOrgFound] = useState(false);

  const { user, isLoaded: isLoaded1 } = useUser();
  const { setActive, isLoaded: isLoaded2 } = useOrganizationList();
  const { organization, isLoaded: isLoaded3 } = useOrganization();

  useEffect(() => {
    const isLoaded = isLoaded1 && isLoaded2 && isLoaded3;

    if (!isLoaded) return;

    if (organization) {
      setLoading(false);
      setNoOrgFound(false);
      return;
    }

    const { organization: userOrg } = user?.organizationMemberships[0] ?? {};

    if (!userOrg) {
      setLoading(false);
      setNoOrgFound(true);
      return;
    }

    console.log("before");
    setActive?.({ organization: userOrg.id });
    console.log("after");
    setLoading(false);
    setNoOrgFound(false);
  }, [isLoaded1, isLoaded2, isLoaded3]);

  return {
    loading,
    noOrgFound,
  };
};
