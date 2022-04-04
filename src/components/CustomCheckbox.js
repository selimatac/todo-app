import React from "react";
import PropTypes from "prop-types";

const CustomCheckbox = (props) => {
  return (
    <label className="custom-checkbox">
      <input type="checkbox" {...props} />
      <span></span>
    </label>
  );
};

CustomCheckbox.propTypes = {
  inputProps: PropTypes.object,
};

export default CustomCheckbox;
