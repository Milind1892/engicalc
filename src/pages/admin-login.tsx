import { useState } from "react";
import Router from "next/router";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  function login() {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      document.cookie = "admin-auth=true; path=/";
      Router.push("/admin");
    } else {
      alert("Wrong password");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Login</h1>
      <input type="password" placeholder="Enter admin password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
