import { HTMLAttributes, ReactElement } from "react";
import { UsePropsType } from "../../hooks/useProps/types";

export type InputBaseProps = UsePropsType<HTMLAttributes<HTMLInputElement>> & {
   size?: "small" | "medium" | "large";
   variants?: "outlined" | "filled" | "normal";
   corner?: "square" | "rounded" | "circle";
   startIcon?: ReactElement;
   endIcon?: ReactElement;
   iconButton?: boolean;
}