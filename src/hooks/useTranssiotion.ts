import { css, CSSObject } from "naxcss";

export interface ApplyType {
   duration: number;
   work: {
      init: CSSObject<{}>;
      enter: CSSObject<{}>;
      exit: CSSObject<{}>;
      exited: CSSObject<{}>;
   }
}


const apply = (ele: HTMLElement, options: ApplyType) => {
   const { work } = options
   let classes: string[] = []

   const obj = {
      start: () => {
         for (let c of classes) {
            ele.classList.remove(c)
         }
         classes = []
         const init = css(work.init)
         const enter = css(work.enter)
         classes.push(init)
         classes.push(enter)
         ele.classList.add(init)
         ele.setAttribute('data-open', "true")
         setTimeout(() => {
            ele.classList.add(enter)
         }, 1);
      },
      exit: () => {
         const isopen = ele.getAttribute('data-open') === 'true'
         if (isopen) {
            for (let c of classes) {
               ele.classList.remove(c)
            }
            classes = []
            const exit = css(work.exit)
            const exited = css(work.exited)
            classes.push(exit)
            classes.push(exited)
            ele.classList.add(exit)
            ele.setAttribute('data-open', "false")
            setTimeout(() => {
               ele.classList.add(exited)
            }, options.duration);
         }
      },
      isOpen: () => ele.getAttribute('data-open') === 'true'
   }
   return obj
}

export default apply