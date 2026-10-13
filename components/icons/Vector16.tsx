import * as React from "react";
import type { SVGProps } from "react";
const SvgVector16 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={7}
    fill="none"
    {...props}
  >
    <path
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M5.75.75h-1c-3 0-4 1-4 4v1"
    />
  </svg>
);
export default SvgVector16;
