import MemoryIcon from "@mui/icons-material/Memory";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import CameraIcon from "@mui/icons-material/Camera";
import Battery4BarIcon from "@mui/icons-material/Battery4Bar";
import PropTypes from "prop-types";

const MostImportantDetails = (props) => {
    return (
        <div className="most-important-details">
            <div title="Display size & resolution">
                <StayCurrentPortraitIcon />
                <span>{props.display_s.split(",")[0]}</span>
                <span className="text-muted">{props.display_r.split(",")[0]}</span>
            </div>
            <div title="Camera">
                <CameraIcon />
                <span>{props.camera_s.split(",")[0]}</span>
                <span className="text-muted">{props.camera_v.split(", ")[1]}</span>
            </div>
            <div title="Storage & RAM">
                <MemoryIcon />
                <span>{props.memory_i}</span>
                <span className="text-muted">
                    Card slot: {props.memory_c ? "Yes" : "No"}
                </span>
            </div>
            <div title="Battery">
                <Battery4BarIcon />
                <span>{props.battery_c.split(",")[0]}</span>
                <span className="text-muted">{props.battery_t.split(",")[0]}</span>
            </div>
        </div>
    );
};

MostImportantDetails.propTypes = {
    battery_c: PropTypes.string.isRequired,
    battery_t: PropTypes.string.isRequired,
    display_s: PropTypes.string.isRequired,
    display_r: PropTypes.string.isRequired,
    camera_s: PropTypes.string.isRequired,
    camera_v: PropTypes.string.isRequired,
    memory_i: PropTypes.string.isRequired,
    memory_c: PropTypes.bool.isRequired,
};

export default MostImportantDetails;
