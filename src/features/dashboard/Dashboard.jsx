import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "@/features/auth/authSlice";

function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken) || localStorage.getItem("accessToken");

  const dashboard = user ? `${user}` : "Guest";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section>
      <h1>{dashboard} USER</h1>
      <p>{tokenAbbr}</p>
    </section>
  );

  return content;
}

export default Dashboard;
