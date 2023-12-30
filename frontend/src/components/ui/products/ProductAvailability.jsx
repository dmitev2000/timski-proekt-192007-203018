import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../shared/URLs";
import ProductAvailabilityElement from "./ProductAvailabilityElement";

const ProductAvailability = ({ phone_id }) => {
  const [expanded, setExpanded] = useState("");
  const [loading, setLoading] = useState(true);
  const [availableIn, setAvailableIn] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/phones/available/in`, {
        params: {
          id: phone_id,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setAvailableIn(res.data);
        
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [phone_id]);

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      className="text-light"
      style={{ backgroundColor: "#1976d2" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Stores & Prices
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <div className="p-3 rounded">
            {availableIn.length === 0 ? (
              <h5>This smartphone is currently unavailable.</h5>
            ) : (
              availableIn.map((element, index) => {
                return (
                  <ProductAvailabilityElement key={index} element={element} />
                );
              })
            )}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

ProductAvailability.propTypes = {
  phone_id: PropTypes.number.isRequired,
};

export default ProductAvailability;
