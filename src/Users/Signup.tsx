import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    if (
      !user.username ||
      !user.password ||
      user.username === "" ||
      user.password === ""
    ) {
      setError("Please enter username and password");
      return;
    }
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input
        value={user.username}
        placeholder="username"
        className="mb-2"
        onChange={(e) =>
          setUser({
            ...user,
            username: e.target.value,
          })
        }
      />
      <br />
      <input
        value={user.password}
        placeholder="password"
        className="mb-2"
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
      />
      <br />
      <button className="btn btn-success" onClick={signup}>
        {" "}
        Signup{" "}
      </button>
    </div>
  );
}
