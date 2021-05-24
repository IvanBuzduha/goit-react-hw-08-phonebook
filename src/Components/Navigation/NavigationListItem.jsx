import { NavLink } from "react-router-dom";

const NavigationListItem = ({ item, location, isAuth }) => {
  return (
    <>
      {!item.isPrivate && !item.isRestricted && (
        <li>
          <NavLink
            to={{
              pathname: item.path,
              state: { from: location.pathname },
            }}
            exact={item.exact}
          >
            {item.name}
          </NavLink>
        </li>
      )}

      {isAuth && item.isPrivate && !item.isRestricted && (
        <li>
          <NavLink
            to={{
              pathname: item.path,
              state: { from: location.pathname },
            }}
            exact={item.exact}
          >
            {item.name}
          </NavLink>
        </li>
      )}

      {!isAuth && !item.isPrivate && item.isRestricted && (
        <li>
          <NavLink
            to={{
              pathname: item.path,
              state: {
                from: location.pathname,
              },
            }}
            exact={item.exact}
          >
            {item.name}
          </NavLink>
        </li>
      )}
    </>
  );
};

export default NavigationListItem;
