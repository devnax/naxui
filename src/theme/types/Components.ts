
import { HTMLAttributes } from "react";
import { UsePropsType } from "../../../hooks/useProps"

type ValueOf<T> = T[keyof T];

export type ThemeComponentVariantProps<Props> = {
   [propName in keyof Props]: {
      [propVal in keyof ValueOf<Props>]: UsePropsType<Props>;
   };
};


export interface ThemeComponentProps<Props> {
   props?: UsePropsType<Props>;
   variants?: ThemeComponentVariantProps<Props>
}

export type ThemeComponentsProps = {
   Button: ThemeComponentProps<HTMLAttributes<HTMLButtonElement>>;
}