import { FormControlLabel } from "material-ui/Form";
import Switch from "material-ui/Switch";
import * as React from "react";

interface ControlledSwitchProps {
  checked: boolean;
  uncheckedLabel?: string;
  label: string;
  onChange?(event: React.ChangeEvent<any>);
}

export const ControlledSwitch: React.StatelessComponent<
  ControlledSwitchProps
> = ({ checked, onChange, label, uncheckedLabel }) => (
  <FormControlLabel
    control={<Switch onChange={onChange} checked={checked} />}
    label={uncheckedLabel ? (checked ? label : uncheckedLabel) : label}
  />
);
export default ControlledSwitch;
