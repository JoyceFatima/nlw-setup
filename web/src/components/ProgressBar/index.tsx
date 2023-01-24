interface ProgressBarProps {
  progress: number
}

export const ProgressBar = (props: ProgressBarProps) => {
  console.log(props)
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-valuenow={props.progress}
        arial-label="Progresso de hábitos completados nesse dia"
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={{ width: `${props.progress}%`}}
      />
    </div>
  );
};
