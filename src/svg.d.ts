declare module "*.svg?react" {
  import * as React from "react"
  const ReactComponent: React.FunctionComponent<React.PropsWithChildren<React.SVGProps<SVGSVGElement>>>
  export default ReactComponent
}
