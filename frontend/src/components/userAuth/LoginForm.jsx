import { useMemo, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Link,
  Tooltip,
} from "@mui/material";
import { Key } from "phosphor-react";
import { colors, styles } from "../../constants/colors";
import axios from "../../api/axiosJsonConfig.js";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useMemo(() => {
    const isFormValid = () => {
      return formData.email.trim() && formData.password.trim();
    };
    setDisabled(!isFormValid());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/login", formData);
      if (response.data.success) {
        console.log("login correctly");
        setSuccessMessage("Login successful!");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: colors.white,
        borderRadius: styles.borderRadius,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginTop: 3,
            borderRadius: styles.borderRadius,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: 3,
          }}
        >
          <Typography
            sx={{
              color: colors.black,
              fontSize: "2rem",
            }}
          >
            Login to your account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email or Username"
              name="email"
              type="text" // Allow either email or username
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="Password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key size={24} color={colors.gray} />
                  </InputAdornment>
                ),
              }}
            />

            {errorMessage && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}

            {successMessage && (
              <Typography color="primary" sx={{ mt: 2 }}>
                {successMessage}
              </Typography>
            )}

            <Tooltip
              title={`The following fields are missing: ${
                formData.email ? "" : "Email/Username, "
              } ${formData.password ? "" : "Password"} `}
              arrow
            >
              <Box
                sx={{
                  width: "100%",
                  padding: 0,
                }}
              >
                <Button
                  type="submit"
                  disabled={disabled}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Box>
            </Tooltip>
          </Box>
        </Box>
        <img
          className="w-[30vw] ml-auto"
          style={{
            borderRadius: styles.borderRadius,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          src="../../public/assets/signupimg.jpg"
        />
      </Box>
    </Box>
  );
};

export default LoginForm;
