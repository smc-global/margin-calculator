import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";
import type { DropDownProps } from "../../../common/interfaces";

const DropDown: React.FC<DropDownProps> = ({
  name,
  label,
  required = false,
  datalist,
  disable = false,
  onChange
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label} is required` : false
      }}
      render={({ field, fieldState }) => {

        const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
          const value = event.target.value as string;

          field.onChange(value);

          if (onChange) {
            onChange(name, value);
          }
        };

        return (
          <TextField
            select
            // fullWidth
            size="small"
            sx={{ width: 150 }}
            label={label}
            value={field.value ?? ""}
            onChange={handleChange}
            disabled={disable}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{
              select: {
                MenuProps: {
                  transitionDuration: 0,
                },
              },
            }}
          >

            {datalist.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};

export default DropDown;