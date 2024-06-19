import React, { useContext, useEffect, useState } from "react";
import supabase from "../auth/client";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../App";

function Register() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [code, setCode] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const session = useContext(SessionContext);

  useEffect(() => {
    const checkUserSession = async () => {
      if (session && session.user && !session.user.email_confirmed_at) {
        setStep(1);
        setEmail(session.user.email);
      } else {
        console.log(session);
      }
    };

    checkUserSession();
  }, []);

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pw,
      data: {
        first_name: firstname,
        last_name: lastname,
      },
    });
    if (error) {
      console.error("Registration Error:", error.message);
    } else if (data.user) {
      setStep(1);
    }
  };

  const handleCode = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: code,
      type: "signup",
    });

    if (error) {
      console.error("Error verifying OTP:", error);
    } else {
      null;
    }
  };

  return (
    <div>
      {step === 0 ? (
        <div>
          <p>Register</p>
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            value={pw}
            placeholder="password"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
          <input
            type="text"
            value={firstname}
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            value={lastname}
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <div
            onClick={async () => {
              await handleRegister();
            }}
          >
            PRESS ME TO CREATE A NEW ACC
          </div>
          <div
            onClick={() => {
              navigate("/login");
            }}
          >
            go to login
          </div>
        </div>
      ) : (
        <div>
          <p>CONFIRM YOUR CODE {email}</p>
          <input
            type="text"
            value={code}
            placeholder="email"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <div
            onClick={async () => {
              await handleCode();
            }}
          >
            PRESS ME TO CONFIRM YOUR EMAIL
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
