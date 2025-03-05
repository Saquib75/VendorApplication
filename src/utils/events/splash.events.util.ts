import { getUser } from '../../store/actions/auth.actions';
import { getConfigs } from "../../store/actions/config.actions";
// import { loadForm } from "../../store/actions/signup_form.actions";

const splashEvents = async (dispatch:any) => {
  //Splash Events
  await dispatch(getUser());
  await dispatch(getConfigs());
  // await dispatch(loadForm())
}


export default splashEvents;