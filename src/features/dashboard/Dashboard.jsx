import AccountBalance from "../users/AccountBalance";

function Dashboard() {
  const content = (
    <section className="space-y-8">
      <AccountBalance />
    </section>
  );

  return content;
}

export default Dashboard;
