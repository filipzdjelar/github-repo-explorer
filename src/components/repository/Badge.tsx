interface BadgeProps {
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ label }) => {
  return <span className="badge__item">{label}</span>;
};

export default Badge;
