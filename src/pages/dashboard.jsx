import React, { useContext } from "react";
import { SessionContext } from "../App";
import supabase from "../auth/client";

function Dashboard() {
  const session = useContext(SessionContext);
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  if (!session) {
    return <div>No active session. Please log in.</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.email}!</p>
      <div
        onClick={async () => {
          handleLogout();
        }}
      >
        PLZ LOGGY OUTY NOW UwU
      </div>
    </div>
  );
}

export default Dashboard;
