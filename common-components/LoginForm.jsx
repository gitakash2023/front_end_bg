"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TextField, Button, Grid, Typography, CircularProgress } from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";
import { _createlogin } from "../utils/apiUtils";
import Logo from "./header-components/Logo";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("candidate Id",id)

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await _createlogin("/users/login", formData);
      
      const { user_role } = response;
      console.log("user_role jo login kr rha hai",user_role)
      setFormData({ username: "", password: "" });
      setError(null);
      if (user_role === 3) {
        router.push(`/admin/candidates/add-candidates?id=${id}`);
      } else if (user_role === 2) {
        router.push("/admin/companies");
      } else {
        router.push("/admin/admin-dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (

    <>
    <Logo/>
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Grid item xs={12} md={8}>
        <div className="card h-100 shadow" style={{ borderRadius: "20px" }}>
          <Grid container>
            <Grid item xs={12}>
              <div className="card-body d-flex flex-column justify-content-center">
                <Typography
                  variant="h4"
                  align="center"
                  style={{ fontWeight: "bold", color: "blue" }}
                >
                  Login
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    margin="normal"
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    value={formData.username}
                    onChange={handleChange}
                    InputProps={{ startAdornment: <FaUser /> }}
                    style={{ backgroundColor: "#f0f2f5", fontSize: "0.8rem" }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{ startAdornment: <FaLock /> }}
                    style={{ backgroundColor: "#f0f2f5", fontSize: "0.8rem" }}
                  />
                  {loading ? (
                    <CircularProgress size={24} style={{ marginTop: "1rem" }} />
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ fontSize: "0.9rem", marginTop: "1rem" }}
                    >
                      Login
                    </Button>
                  )}
                </form>
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
                <div className="mt-3">
                  <Typography
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Forgot Password? </span>
                    <Link href="/auth/forgot-password">
                      <span style={{ textDecoration: "none" }}>
                        Reset it here
                      </span>
                    </Link>
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
    </>
  );
};

export default LoginForm;