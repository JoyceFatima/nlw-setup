import { Check } from "phosphor-react";
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../../lib/axios';

import { CustomCheckbox } from "../CustomCheckbox";

const weekDay = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const NewHabitForm = () => {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggle(index: number) {
    if(weekDays.includes(index)) {
      const checkRemoveOne = weekDays.filter((day: number)  => day !== index);
      
      setWeekDays(checkRemoveOne)
    } else {
      const checkAddedOne = [...weekDays, index]
      
      setWeekDays(checkAddedOne)
    }
  }

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if(!title || weekDays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays
    })

    setTitle('')
    setWeekDays([])

    alert('Hábito criado com sucesso!')
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Estudar, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="subTitle" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {weekDay.map((weekDay, index) => {
          return (
            <CustomCheckbox 
              key={index}
              title={weekDay}
              check={weekDays.includes(index)}
              onCheckedChange={() => handleToggle(index)}
              options={false}
            />
          )
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold transition-colors bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
};
