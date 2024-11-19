import React, { ReactNode, useEffect, useState } from "react";


type Callback = () => ReactNode


const Renderar = {
   components: {} as { [id: string]: Callback },
   dispatch: () => { },
   create: (id: string, component: Callback) => {
      Renderar.components[id] = component
   },
   delete: (id: string) => {
      if (Renderar.components[id]) {
         delete Renderar.components[id]
         Renderar.dispatch()
      }
   }
}

export default Renderar

export const RenderComponents = () => {
   const [, dispatch] = useState(0)
   useEffect(() => {
      Renderar.dispatch = () => {
         dispatch(Math.random())
      }
   }, [])

   return <>{Object.values(Renderar.components).map((Render: any, idx) => <Render key={"renderar" + idx} />)}</>
}