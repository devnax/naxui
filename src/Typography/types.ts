import { HTMLAttributes } from "react";
import { UsePropsType } from "../hooks/useProps/types";
import { TextRefTypes } from '../styles/theme/types'

export type TypographyProps = UsePropsType<HTMLAttributes<HTMLElement>> & {
   variant?: TextRefTypes
}