import * as React from "react";
import type { SVGProps } from "react";
const SvgVector10 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={3}
    height={2}
    fill="none"
    {...props}
  >
    <path
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M1 1h.1"
    />
  </svg>
);
export default SvgVector10;
