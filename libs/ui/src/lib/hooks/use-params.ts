'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export const useParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const changeParams = (name: string, value: string | undefined | null) => {
    const _params = Object.fromEntries(searchParams.entries());

    if (!value) delete _params[name];

    if (value) Object.assign(_params, { [name]: value });

    router.replace(`?${new URLSearchParams(_params)}`, {
      scroll: false,
    });
  };

  const getParam = (key: string) => searchParams.get(key);

  return {
    params: Object.fromEntries(searchParams.entries()),
    changeParams,
    getParam,
  };
};
