import { useContext, useEffect, useState } from "react";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
import { AuthContext } from "../../../shared/AuthContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { API_BASE_URL } from "../../../shared/URLs";

const AddNewDeviceToDb = () => {
  const [loading, setLoading] = useState(true);
  const [brandsList, setBrandsList] = useState([]);
  const [text, setText] = useState("");
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([]);
  const AuthCtx = useContext(AuthContext);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const availableColors = [
    "Graphite",
    "Gold",
    "Silver",
    "White",
    "Sierra Blue",
    "Alpine Green",
    "Black",
  ];

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/phones/brands/list`)
      .then((res) => {
        setBrandsList(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event) => {
    setBrand(event.target.value);
  };

  const handleChangeColors = (event) => {
    const {
      target: { value },
    } = event;
    setColors(typeof value === "string" ? value.split(",") : value);
  };

  const jsonInputChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContents = e.target.result;
        setText(fileContents);
      };

      reader.readAsText(selectedFile);
    } else {
      console.error("No file selected.");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    axios
      .post(`${API_BASE_URL}/admin/devices/add`, formData, {
        headers: {
          Authorization: `Bearer ${AuthCtx.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Add new device</h3>
      <form
        className="py-5 d-flex gap-5 justify-content-start align-items-center flex-wrap"
        onSubmit={submitHandler}
        encType="multipart/form-data"
        id="add-device-form"
      >
        <div className="d-flex flex-column gap-3">
          <label htmlFor="json">Phone specifications (json file)</label>
          <Input
            id="json"
            type="file"
            lang="en"
            inputProps={{ accept: "application/json" }}
            onChange={jsonInputChange}
            required
          />
        </div>
        <div className="d-flex flex-column gap-3">
          <label htmlFor="image">Phone image (png, jpg, jpeg...)</label>
          <Input
            id="image"
            name="image"
            type="file"
            lang="en"
            inputProps={{ accept: "image/*" }}
            required
          />
        </div>
        <div>
          {loading ? (
            <h5>Loading brands...</h5>
          ) : (
            <FormControl sx={{ minWidth: "300px" }} size="medium">
              <InputLabel id="brand-label">Brand</InputLabel>
              <Select
                required
                labelId="brand-label"
                id="brand"
                value={brand}
                label="Brand"
                name="brand"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {brandsList.map((element) => {
                  return (
                    <MenuItem
                      value={element.brand_name}
                      key={element.brand_name}
                    >
                      {element.brand_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
        </div>
        <div>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="colors-label">Colors</InputLabel>
            <Select
              labelId="colors-label"
              id="colors"
              name="colors"
              required
              multiple
              value={colors}
              onChange={handleChangeColors}
              input={<OutlinedInput label="Colors" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {availableColors.map((colorName) => (
                <MenuItem key={colorName} value={colorName.toLowerCase()}>
                  <Checkbox
                    checked={colors.indexOf(colorName.toLowerCase()) > -1}
                  />
                  <ListItemText primary={colorName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <textarea
          name="converted_json"
          value={text}
          onChange={() => {}}
          hidden
        />
        <Button variant="outlined" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddNewDeviceToDb;
