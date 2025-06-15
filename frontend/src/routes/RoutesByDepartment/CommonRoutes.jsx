import { Route } from "react-router-dom";
import SendMessage from "../../pages/Views/Shared/Message/SendMessage";
import ViewMessageList from "../../pages/Views/Shared/Message/ViewMessageList";
import ViewMessageOutbox from "../../pages/Views/Shared/Message/ViewMessageOutbox";
import ViewMessageDetail from "../../pages/Views/Shared/Message/ViewMessageDetail";
import MyActivities from "../../pages/Views/Shared/CurrentUser/MyActivities";
import MyProfile from "../../pages/Views/Shared/CurrentUser/MyProfile";
import MyPreference from "../../pages/Views/Shared/Preference/MyPreference";
import Logout from "../../pages/Auth/Logout";
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import ChangePassword from "../../pages/Views/Shared/ChangePassword";
import NotFound from "../../pages/NotFound";

export default function CommonRoutes({ decodedUser }) {
  const common = (
    <>
      <Route path="/sendMessage" element={<SendMessage />} />
      <Route path="/viewMessageList" element={<ViewMessageList />} />
      <Route path="/viewMessageList" element={<ViewMessageList />} />
      <Route path="/viewMessageOutbox" element={<ViewMessageOutbox />} />
      <Route path="/viewMessageDetail" element={<ViewMessageDetail />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/activities" element={<MyActivities />} />
      <Route path="/myPreference" element={<MyPreference />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
  return common;
}
