/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PageWrapper from "../layout/PageWrapper";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/AuthContext";
import { useNavigate } from "react-router-dom";
import default_account from "../../assets/default_account.jpg";
import { translateRole } from "../../shared/Utils";

const UserProfile = () => {
  const AuthCtx = useContext(AuthContext);
  const [accOpen, setAccOpen] = useState(true);
  const navigate = useNavigate();

  // TODO: Implement CHANGE PASSWORD Scenario

  useEffect(() => {
    if (!AuthCtx.user) {
      navigate("/login");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <PageWrapper>
      <div>
        <h3 className="mb-5">Your Profile</h3>
        <div className="custom-row">
          <div>
            <h4 className="text-center mt-5">
              Welcome dear {translateRole(AuthCtx.user.user.role).toLowerCase()}
              , <b>{AuthCtx.user.user.username}</b>.
            </h4>
            <img
              src={default_account}
              className="d-block mx-auto"
              style={{ maxWidth: "50%" }}
              alt=""
            />
          </div>
          <Accordion
            style={{ minWidth: "400px" }}
            expanded={accOpen}
            onClick={() => setAccOpen(!accOpen)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Reset password</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="mb-3">
                Use the form below to change your password. Enter your current
                password along with the new one to update your account security.
              </Typography>
              <form onSubmit={submitHandler}>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="currentPassword">
                    Your current password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    className="form-control"
                    required
                    minLength={8}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="newPassword">
                    New password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="form-control"
                    required
                    minLength={8}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="confNewPassword">
                    Confirm new password
                  </label>
                  <input
                    id="confNewPassword"
                    type="password"
                    className="form-control"
                    required
                    minLength={8}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UserProfile;
