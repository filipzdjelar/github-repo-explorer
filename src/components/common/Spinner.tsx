const Spinner: React.FC<SpinnerProps> = ({ variant }) => {
  return (
    <div className="spinner-container">
      <div className={`spinner spinner__variant-${variant}`}></div>
    </div>
  );
};

export default Spinner;

interface SpinnerProps {
  variant: SpinnerVariant;
}

export enum SpinnerVariant {
  LIGHT = "light",
  DARK = "dark",
}
