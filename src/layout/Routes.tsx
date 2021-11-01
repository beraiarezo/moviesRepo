import React, { FC, useLayoutEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Content } from './Content'
import { Movies } from 'src/features/topRatedMovies/Movies'
import { Favorites } from 'src/features/favorites/Favorites'

const Routes: FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Content>
        <Switch>
          <Route exact path='/' component={Movies} />
          <Route exact path='/mymovies' component={Favorites} />
        </Switch>
      </Content>
    </>
  )
}

export default Routes
