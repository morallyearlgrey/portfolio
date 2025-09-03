import React, { useState } from 'react';
import { Resizable } from 're-resizable';

const ResizableBoxWithLibrary: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [size, setSize] = useState({ width: 200, height: 100 });

  return (
    <Resizable
      size={size}
      onResizeStop={(e, direction, ref, d) => {
        setSize({
          width: size.width + d.width,
          height: size.height + d.height,
        });
      }}
      enable={{
        top: true,
        right: true, // Enable right-side resizing for width
        bottom: true,
        left: true,
      }}
      style={{ border: '1px solid black' }}
    >
      {children}
    </Resizable>
  );
};

export default ResizableBoxWithLibrary;