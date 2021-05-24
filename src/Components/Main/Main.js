import React, { Suspense } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { errorSelector } from "../../redux/auth/authSelector";
import mainRoutes from "../../routes/mainRoutes";
import PrivateRoute from "../../routes/PrivateRoute";
import PublicRoute from "../../routes/PublicRoute";

const Main = ({ isAuth, error }) => {
  return (
    <>
      <Suspense
        fallback={
          // <h2>Loading...</h2>

          <Loader
            type="Oval"
            color="rgb(16, 185, 129)"
            height={50}
            width={50}
            className="  flex flex-wrap justify-center items-center/"
          />
        }
      >
        {/* {error && <h3 className="text-red-500">{error}</h3>} */}
        <Switch>
          {mainRoutes.map((item) =>
            item.isPrivate ? (
              <PrivateRoute {...item} key={item.path} isAuth={isAuth} />
            ) : (
              <PublicRoute {...item} key={item.path} isAuth={isAuth} />
            )
          )}
        </Switch>
      </Suspense>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.token?.idToken,
  error: errorSelector(state),
});

export default connect(mapStateToProps)(Main);
