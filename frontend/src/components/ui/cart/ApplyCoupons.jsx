/* eslint-disable react/no-unescaped-entities */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Coupon from "./Coupon";

const ApplyCoupons = () => {
  const dummy_coupons = [
    { coupon_id: 1, coupon_value: 1000, expires: "11 Oct 2023" },
    { coupon_id: 2, coupon_value: 1500, expires: "12 Jun 2024" },
  ];
  return (
    <Accordion className="text-light" style={{ backgroundColor: "#1976d2" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Coupons ({dummy_coupons.length})</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {dummy_coupons.length === 0 ? (
          <Typography>You don't have any discount coupons.</Typography>
        ) : (
          <>
            {dummy_coupons.map((coupon, index) => {
              return <Coupon key={index} coupon_info={coupon} />;
            })}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ApplyCoupons;
