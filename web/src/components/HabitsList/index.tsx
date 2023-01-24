import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { CustomCheckbox } from "../CustomCheckbox";

interface HabitsListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    create_at: string;
  }>;
  completedHabits: string[];
}

export const HabitsList = ({ date, onCompletedChanged }: HabitsListProps) => {
  const [habitsInfo, setHabitsInfos] = useState<HabitsInfo>();
  
  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfos(response.data);
      });
  }, []);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    let completedHabits: string[] = [];

    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)
    if(isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }
    setHabitsInfos({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    })

    onCompletedChanged(completedHabits.length)
  }


  const isDatePassed = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits?.map((habit) => {
        return (
          <CustomCheckbox
            key={habit.id}
            title={habit.title}
            check={habitsInfo.completedHabits?.includes(habit.id)}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            disabled={isDatePassed}
            options={true}
          />
        );
      })}
    </div>
  );
};
