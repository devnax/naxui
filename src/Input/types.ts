import { InputHTMLAttributes, ReactElement, TextareaHTMLAttributes } from "react";
import { UsePropsType } from "../hooks/useProps/types";

export type InputProps = UsePropsType<InputHTMLAttributes<HTMLInputElement>> & TextareaHTMLAttributes<HTMLTextAreaElement> & {
   multiline?: boolean;
   rows?: number;
   minRows?: number;
   maxRows?: number;
   variant?: "oulined" | "filled";
   label?: string | ReactElement;
   focusProps?: InputProps;
   error?: boolean;
   helperText?: string;
   size?: "small" | "medium" | "large";
   fullWidth?: boolean;
}