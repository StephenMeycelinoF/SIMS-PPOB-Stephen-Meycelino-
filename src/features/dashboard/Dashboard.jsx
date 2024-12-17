import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../auth/authSlice";

function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const dashboard = user ? `${user}` : "Guest";
  const tokenAbbr = `${token.slice(0, 10)}...`;

  const content = (
    <section>
      <h1>{dashboard}</h1>
      <p>{tokenAbbr}</p>
    </section>
  );

  return content;
}

export default Dashboard;
