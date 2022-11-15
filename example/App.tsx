import React, { useState } from 'react';
import useProps from '../src/hooks/useProps'

const Root = () => {

   const [color, setColor] = useState("red")

   const { css, props, className } = useProps({
      bgcolor: color,
      width: 100,
      height: 100,
      hover: {
         bgcolor: "black"
      },
      id: "10"
   })

   return (
      <div
         {...props}
         className={className}
      >
         <button onClick={() => setColor(color === 'red' ? "green" : "red")}>toggle</button>
      </div>
   )
}

export default Root