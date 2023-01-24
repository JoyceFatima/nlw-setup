import clsx from "clsx";
import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";

interface CustomCheckboxProps extends Checkbox.CheckboxProps {
  title: string;
  check?: boolean;
  options?: boolean;
}

export const CustomCheckbox = ({
  title,
  check,
  options,
  ...rest
}: CustomCheckboxProps) => {

  return (
    <>
      <Checkbox.Root
        className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
        checked={check}
        {...rest}
      >
        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
          <Checkbox.Indicator>
            <Check size={20} className="text-white" />
          </Checkbox.Indicator>
        </div>

        <span
          className={clsx({
            "font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400":
              options === true,
            "text-white leading-tight": options === false,
          })}
        >
          {title}
        </span>
      </Checkbox.Root>
    </>
  );
};
