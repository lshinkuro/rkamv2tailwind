import React from 'react'
import { Label, Input, Button, HelperText } from "@windmill/react-ui";
import { Link, useHistory } from "react-router-dom";


export const LinkButton = (props) => {
    return (
        <>
            <p className="mt-1">
                <Link
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    to={props.to}
                >
                    {props.name}
                </Link>
            </p>
        </>
    )
}
const WithLabel = Component => {
    return props => (
        <Label>
            <span className="text-gray-800">
                {" "}
                <span className="text-red-500">*</span>{props.label}
            </span>
            <Component {...props} />
        </Label>
    );
};

const MyInput = props => (
    <Input
        className="mt-1"
        placeholder={props.inputPlaceholder}
        defaultValue={props.inputValue}
        onChange={props.inputOnChange}
        {...props}
    />
);


export const InputWithLabel = WithLabel(MyInput);