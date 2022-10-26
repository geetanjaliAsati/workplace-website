import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { domainList, skillsList } from "../../../constants";
import {
  Grid,
  Chip,
  FormControl,
  OutlinedInput,
  ListItemText,
  MenuItem,
  Checkbox,
  Select,
} from "@mui/material";
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

function JobSearch({ filter, setFilter }) {
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter((p) => {
      return {
        ...p,
        selectedSkills: typeof value === "string" ? value.split(",") : value,
      };
    });
    // On autofill we get a stringified value.
  };
  return (
    <div>
      <Grid constainer spacing={2}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            fullWidth
            value={filter.selectedDomain}
            onChange={(event, newValue) => {
              setFilter((p) => {
                return { ...p, selectedDomain: newValue };
              });
            }}
            inputValue={filter.selectedDomain}
            onInputChange={(event, newInputValue) => {
              setFilter((p) => {
                return { ...p, selectedDomain: newInputValue };
              });
            }}
            id="controllable-states-demo"
            options={domainList}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Domain" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ width: "100%" }}>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={filter.selectedSkills}
              onChange={handleSkillsChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {skillsList.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={filter.selectedSkills.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default JobSearch;
