type SectionTagNameProps = {
  text: string;
};

const SectionTagName = ({ text }: SectionTagNameProps) => {
  return (
    <p className="uppercase font-medium text-xs md:text-sm text-blue-ignition border-b-2 border-b-red-amber-torque w-fit h-fit">
      {text}
    </p>
  );
};

export default SectionTagName;
