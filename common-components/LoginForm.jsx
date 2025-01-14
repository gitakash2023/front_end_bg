"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TextField, Button, Typography, CircularProgress, Box, Container } from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";
import { _createlogin } from "../utils/apiUtils";
import Logo from "./header-components/Logo";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateId");
  console.log("inide login",candidateId)

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
      
      if (typeof window !== 'undefined') { 
        localStorage.setItem('role', user_role);
      }
     
      setFormData({ username: "", password: "" });
      setError(null);

      let redirectPath = '';

      switch (user_role) {
        case 1:
          redirectPath = "/admin/admin-dashboard";
          break;
        case 2:
          redirectPath = "/client/client-dashboard";
          break;
        case 3:
          redirectPath = candidateId ? `/admin/candidates/add-candidates?id=${candidateId}` : `/admin/candidates/add-candidates`;
          break;
        case 4:
          redirectPath = "/geninfo/dashboard";
          break;
        case 5:
          redirectPath = "/educationinfo/dashboard";
          break;
        case 6:
          redirectPath = "/addressinfo/dashboard";
          break;
        case 7:
          redirectPath = "/cibilinfo/dashboard";
          break;
        case 8:
          redirectPath = "/referenceinfo/dashboard";
          break;
        case 9:
          redirectPath = "/experienceinfo/dashboard";
          break;
        default:
          setError("Invalid user role.");
          setLoading(false);
          return;
      }

      router.push(redirectPath);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Logo sx={{ mb: 4 }} />
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
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
            InputProps={{
              startAdornment: <FaUser style={{ marginRight: 8 }} />,
            }}
            sx={{
              backgroundColor: '#f0f2f5',
              fontSize: '0.9rem',
              mb: 2,
            }}
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
            InputProps={{
              startAdornment: <FaLock style={{ marginRight: 8 }} />,
            }}
            sx={{
              backgroundColor: '#f0f2f5',
              fontSize: '0.9rem',
              mb: 2,
            }}
          />
          {loading ? (
            <CircularProgress size={24} sx={{ marginTop: 2 }} />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontSize: '0.9rem', marginTop: 2 }}
            >
              Login
            </Button>
          )}
        </form>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Typography variant="body2" sx={{ mt: 2 }}>
          <span>Forgot Password? </span>
          <Link href="/auth/forgot-password">
            <span style={{ textDecoration: 'none', color: '#1976d2' }}>
              Reset it here
            </span>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
