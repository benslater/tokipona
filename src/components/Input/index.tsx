import React, { Component, ChangeEvent } from "react";
import classnames from "classnames";

import "./styles.css";

interface InputProps {
  containerClass?: string;
  iconClass?: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  placeholder?: string;
}

export default class Input extends Component<InputProps> {
  render() {
    const {
      containerClass,
      iconClass,
      className,
      type,
      value,
      onChange = () => {},
      icon,
      placeholder = ""
    } = this.props;
    return (
      <div className={classnames("input", containerClass)}>
        {!!icon && (
          <i className={classnames("material-icons input__icon", iconClass)}>
            {icon}
          </i>
        )}
        <input
          className={classnames(
            "input__input",
            { "input__input--with_padding": !!icon },
            className
          )}
          placeholder={placeholder}
          type={type || "text"}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}
