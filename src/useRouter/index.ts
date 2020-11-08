import { useHistory, useParams, useLocation, useRouteMatch } from 'react-router-dom'
import { useMemo } from 'react'
import queryString from 'query-string'

export const useRouter = () => {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params
      },
      match,
      location,
      history
    };
  }, [params, match, location, history]);
}
