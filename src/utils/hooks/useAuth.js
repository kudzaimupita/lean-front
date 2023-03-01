import { useSelector, useDispatch } from "react-redux";
import { setUser, initialState } from "store/auth/userSlice";
import { apiSignIn, apiSignOut, apiSignUp } from "services/AuthService";
import {
  onSignInSuccess,
  onSignOutSuccess,
  setToken,
} from "store/auth/sessionSlice";
import { setSite } from "store/auth/siteSlice";
import { setCompany } from "store/auth/companySlice";
import appConfig from "configs/app.config";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { token, signedIn } = useSelector((state) => state.auth.session);

  const signIn = async (values) => {
    try {
      const resp = await apiSignIn(values);
      if (resp.data) {
        const { token } = resp.data;

        if (resp.data.user) {
          if (!resp.data.user.isOrgSetup || !resp.data.user.company) {
            dispatch(
              setUser({ ...resp.data.user, userName: resp.data.user.name })
            );
            dispatch(setToken(resp.data?.tokens?.access?.token));
            navigate("/welcome");
          } else if (resp.data?.user?.isOrgSetup || resp.data?.user?.company) {
            dispatch(onSignInSuccess(resp.data?.tokens?.access?.token));
            dispatch(setCompany(resp.data?.user.company));
            dispatch(setSite(resp?.data?.user?.company?.sites[0]));
            dispatch(
              setUser(
                {
                  ...resp.data.user,
                  // authority: ["USER", "admin", "user"],
                  userName: resp.data.user.name,
                } || {
                  avatar: "",
                  userName: "Anonymous",
                  authority: ["USER", "admin", "user"],
                  email: "",
                }
              )
            );
            navigate(appConfig.authenticatedEntryPath);
          }
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);

        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const signUp = async (values) => {
    console.log(values);
    try {
      const resp = await apiSignUp(values);
      if (resp.data) {
        const { token } = resp.data;
        dispatch(setToken(resp.data.tokens.access.token));
        if (resp.data.user) {
          dispatch(
            setUser({ ...resp.data.user, userName: resp.data.user.name })
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate("/welcome");
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = async () => {
    // await apiSignOut()
    handleSignOut();
  };

  return {
    token: token,
    authenticated: token && signedIn,
    signIn,
    signUp,
    signOut,
  };
}

export default useAuth;
