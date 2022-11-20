import { css, CSSObject } from "naxcss"

const _css = (_cs: CSSObject<{}>) => css(_cs, { classPrefix: "trans-" })

type FramesProps = CSSObject<{}> & {
   duration: number
}

type AnimateProps = {
   infinity?: boolean;
   keyframes: FramesProps[];
}


const callanim = (ele: HTMLElement, frames: FramesProps[], index = 0) => {
   const frame = frames[index]
   const has = ele.getAttribute('data-animate')

   if (!frame) {
      return
   }
   has && ele.classList.remove(has)
   ele.removeAttribute('data-animate')
   const { duration, ...cssprops } = frame
   const effect = _css(cssprops)
   ele.setAttribute('data-animate', effect)
   ele.classList.add(effect)

   setTimeout(() => {
      callanim(ele, frames, index + 1)
   }, duration);
}


const animate = (ele: HTMLElement, { keyframes, infinity }: AnimateProps) => {
   const isWorking = ele.getAttribute('data-animate')
   if (isWorking) return
   callanim(ele, keyframes, 0)
}


export default animate