import * as React from "react";
import type { SVGProps } from "react";
const SvgVector9 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={3}
    height={3}
    fill="none"
    {...props}
  >
    <path
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m.75 1.75 1-1"
    />
  </svg>
);
export default SvgVector9;
