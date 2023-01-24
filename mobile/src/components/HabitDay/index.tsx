import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from "react-native";
import clsx from "clsx";

import { generateProgressPercentage } from "../../utils/generate-progress-percentage";
import dayjs from 'dayjs';

interface HabitDayProps extends TouchableOpacityProps {
  date: Date;
  amount?: number;
  completed?: number;
}

const weekDays = 7;
const screeanHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get("screen").width / weekDays - (screeanHorizontalPadding + 5);

export function HabitDay({
  date,
  amount = 0,
  completed = 0,
  ...rest
}: HabitDayProps) {
  const completedPercentage =
    amount > 0 ? generateProgressPercentage(amount, completed) : 0;

  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-zinc-800"] : completedPercentage === 0,
        ["bg-violet-900 border-violet-700"] :
          completedPercentage > 0 && completedPercentage < 20,
        ["bg-violet-800 border-violet-600"] :
          completedPercentage >= 20 && completedPercentage < 40,
        ["bg-violet-700 border-violet-500"] :
          completedPercentage >= 40 && completedPercentage < 60,
        ["bg-violet-600 border-violet-500"] :
          completedPercentage >= 60 && completedPercentage < 80,
        ["bg-violet-500 border-violet-400"] : completedPercentage >= 80,
        "border-white border-4" : isCurrentDay,
      })}
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}
