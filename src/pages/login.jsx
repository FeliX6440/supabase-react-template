import React, { useState, useEffect } from "react";
import supabase from "../auth/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(0);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pw,
    });

    if (error) {
      if (error.message === "Email not confirmed") {
        setStep(1);
      }
      return;
    }

    if (data.session) {
      if (!data.user.email_confirmed_at) {
        setStep(1);
      } else {
        null;
      }
    }
  };

  const handleConfirmCode = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: code,
      type: "signup",
    });

    if (error) {
      console.error("Error verifying OTP:", error.message);
      return;
    }
    null;
  };

  const requestNewCode = async () => {
    const { data, error } = await supabase.auth.api.sendVerificationEmail(
      email
    );

    if (error) {
      console.error("Error requesting new verification code:", error.message);
    } else {
      alert("A new verification code has been sent to your email.");
    }
  };

  return (
    <div>
      {step === 0 ? (
        <div>
          <p>Login</p>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <div
            onClick={async () => {
              await handleLogin();
            }}
          >
            CLICK ME TO LOG IN
          </div>
          <div onClick={async () => await requestNewCode()}>
            REQUEST A NEW CODE
          </div>
          <div
            onClick={() => {
              navigate("/register");
            }}
          >
            go to register
          </div>
        </div>
      ) : (
        <div>
          <p>CONFIRM YOUR EMAIL</p>
          <input
            type="text"
            value={code}
            placeholder="Enter your confirmation code"
            onChange={(e) => setCode(e.target.value)}
          />
          <div
            onClick={async () => {
              await handleConfirmCode();
            }}
          >
            CLICK ME TO CONFIRM YOUR EMAIL
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
