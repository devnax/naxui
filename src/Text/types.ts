import { HTMLAttributes } from "react";
import { UsePropsType } from "../hooks/useProps/types";

export type TextProps = UsePropsType<HTMLAttributes<HTMLElement>> & {
   variant?: 'Headline1' | 'Headline2' | 'Headline3' | 'Headline4' | 'Headline5' | 'Headline6' | 'Subtitle1' | 'Subtitle2' | 'Body1' | 'Body2' | 'Button' | 'Caption' | 'Overline'
}