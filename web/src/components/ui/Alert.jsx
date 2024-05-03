import { InformationCircleIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

const variants = {
  info: "bg-blue-100 text-blue-900",
  danger: "bg-red-100 text-red-900",
}
const Alert = (props) => {
  const {
    as: Component = "div",
    variant = "info",
    children,
    ...otherProps
  } = props

  return (
    <Component
      className={clsx("flex gap-4 p-4 rounded-md", variants[variant])}
      {...otherProps}
    >
      <InformationCircleIcon className={clsx("w-6", variants[variant])} />
      {children}
    </Component>
  )
}

export default Alert
