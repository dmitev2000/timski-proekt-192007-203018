import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useState } from "react";
import PropTypes from "prop-types";
import ProductAvailability from "./ProductAvailability";

const DetailsAccordions = ({ data }) => {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <ProductAvailability phone_id={data.phone_id} />
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Network, Body & Display
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {["Network", "Body", "Display"].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListSubheader>{sectionId}</ListSubheader>
                  {sectionId === "Network" && (
                    <ListItem>
                      <ListItemText primary={data.network_spec} />
                    </ListItem>
                  )}
                  {sectionId === "Body" && (
                    <>
                      <ListItem>
                        <ListItemText
                          primary={`Dimensions: ${data.body_dimensions}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Weight: ${data.body_weight}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`SIM: ${data.body_sim}`} />
                      </ListItem>
                    </>
                  )}
                  {sectionId === "Display" && (
                    <>
                      <ListItem>
                        <ListItemText primary={`Type: ${data.display_type}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Size: ${data.display_size}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Resoulution: ${data.display_resolution}`}
                        />
                      </ListItem>
                    </>
                  )}
                </ul>
              </li>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Platform, Memory & Battery
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {["Platform", "Memory", "Battery"].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListSubheader>{sectionId}</ListSubheader>
                  {sectionId === "Platform" && (
                    <>
                      <ListItem>
                        <ListItemText primary={`OS: ${data.platform_os}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Chipset: ${data.platform_chipset}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`CPU: ${data.platform_cpu}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`GPU: ${data.platform_gpu}`} />
                      </ListItem>
                    </>
                  )}
                  {sectionId === "Memory" && (
                    <>
                      <ListItem>
                        <ListItemText
                          primary={`Internal: ${data.memory_internal}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Card slot: ${
                            data.memory_card_slot ? "Yes" : "No"
                          }`}
                        />
                      </ListItem>
                    </>
                  )}
                  {sectionId === "Battery" && (
                    <>
                      <ListItem>
                        <ListItemText primary={`Type: ${data.battery_type}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Charging: ${data.battery_charging}`}
                        />
                      </ListItem>
                    </>
                  )}
                </ul>
              </li>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Sound, Comms & Features
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {["Sound", "Comms", "Features"].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListSubheader>{sectionId}</ListSubheader>
                  {sectionId === "Sound" && (
                    <>
                      <ListItem>
                        <ListItemText
                          primary={`Loudspeaker: ${
                            data.sound_loudspeaker ? "Yes" : "No"
                          }`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Sound jack: ${data.sound_jack}`}
                        />
                      </ListItem>
                    </>
                  )}
                  {sectionId === "Comms" && (
                    <>
                      <ListItem>
                        <ListItemText primary={`WLAN: ${data.comms_wlan}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Bluetooth: ${data.comms_bluetooth}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Positioning: ${data.comms_positioning}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`NFC: ${data.comms_nfc}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Radio: ${data.comms_radio}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`USB: ${data.comms_usb}`} />
                      </ListItem>
                    </>
                  )}
                  {sectionId === "Features" && (
                    <>
                      <ListItem>
                        <ListItemText primary={`Sensors: ${data.sensors}`} />
                      </ListItem>
                    </>
                  )}
                </ul>
              </li>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Cameras</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Main & Selfie
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {["Main Camera", "Selfie Camera"].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListSubheader>{sectionId}</ListSubheader>
                  {sectionId === "Main Camera" && (
                    <>
                      <ListItem>
                        <ListItemText
                          primary={`Type: ${data.main_camera_type}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Spec: ${data.main_camera_spec}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Features: ${
                            data.main_camera_features !== null
                              ? data.main_camera_features
                              : "None"
                          }`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Video: ${data.main_camera_video}`}
                        />
                      </ListItem>
                    </>
                  )}
                  {sectionId === "Selfie Camera" && (
                    <>
                      <ListItem>
                        <ListItemText
                          primary={`Type: ${data.selfie_camera_type}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Spec: ${data.selfie_camera_spec}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Features: ${
                            data.selfie_camera_features !== null
                              ? data.selfie_camera_features
                              : "None"
                          }`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Video: ${data.selfie_camera_video}`}
                        />
                      </ListItem>
                    </>
                  )}
                </ul>
              </li>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

DetailsAccordions.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DetailsAccordions;
