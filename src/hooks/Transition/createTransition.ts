import { css, CSSObject } from "naxcss";

const _css = (_cs: CSSObject<{}>) => css(_cs, { classPrefix: "trans-" })

type KeyFramesProps = CSSObject<{}> & {
   duration: number
}

export interface CreateTransitionOptions {
   ele: HTMLElement | undefined;
   duration: number;
   animation: {
      initial: CSSObject<{}>;
      animate: CSSObject<{}>;
      exit: CSSObject<{}>;
      exited: CSSObject<{}>;
   },
   keyframes?: KeyFramesProps[],
   onOpen?: () => void;
   onExit?: () => void;
}

export interface TransitionObjectType {
   ele: HTMLElement | undefined;
   setEle: (ele: HTMLElement) => void;
   animate: () => void;
   exit: () => void;
   open: boolean;
   classes: string[];
}

const createTransition = (options: CreateTransitionOptions): TransitionObjectType => {
   const { animation, ele: Ele } = options
   const transition: TransitionObjectType = {
      ele: Ele,
      open: false,
      classes: []
   } as any

   transition.setEle = (ele) => transition.ele = ele

   transition.animate = () => {
      const { ele, classes } = transition
      if (!ele) return
      for (let c of classes) {
         ele.classList.remove(c)
      }
      transition.classes = []
      const init = _css(animation.initial)
      transition.classes.push(init)
      ele.classList.add(init)
      setTimeout(() => {
         const animate = _css(animation.animate)
         transition.classes.push(animate)
         ele.classList.add(animate)
         transition.open = true
      }, 1);

      setTimeout(() => {
         options?.onOpen && options.onOpen()
      }, options.duration);
   }

   transition.exit = () => {

      const { ele, classes } = transition

      if (ele && transition.open) {
         for (let c of classes) {
            ele.classList.remove(c)
         }
         transition.classes = []
         const exit = _css(animation.exit)
         transition.classes.push(exit)
         ele.classList.add(exit)
         setTimeout(() => {
            const exited = _css(animation.exited)
            transition.classes.push(exited)
            ele.classList.add(exited)
            options?.onExit && options.onExit()
            transition.open = false
         }, options.duration);
      }
   }

   return transition
}

export default createTransition