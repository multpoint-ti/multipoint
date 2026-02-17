type SectionTagNameProps = {
  text: string;
  className?: string;
};

const SectionTagName = ({ text, className }: SectionTagNameProps) => {
  return (
    <p className={`uppercase font-semibold text-xs md:text-sm border-b-2 border-b-red-amber-torque w-fit h-fit ${className || 'text-blue-ignition'}`}>
      {text}
    </p>
  );
};

export default SectionTagName;
