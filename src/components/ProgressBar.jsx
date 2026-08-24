import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="progress-bar"
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
