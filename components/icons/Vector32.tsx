import * as React from "react";
import type { SVGProps } from "react";
const SvgVector32 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={19}
    fill="none"
    {...props}
  >
    <path
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M.75 7.75v-2c0-2.72 1.64-4.62 4.19-4.94q.39-.06.81-.06h9c.26 0 .51.01.75.05 2.58.3 4.25 2.21 4.25 4.95V7.2h-2.08c-.56 0-1.07.22-1.44.6-.42.41-.66 1-.6 1.63.09 1.08 1.08 1.87 2.16 1.87h1.96v1.45c0 3-2 5-5 5h-2.5"
    />
  </svg>
);
export default SvgVector32;
