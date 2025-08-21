const ToolTip = ({ text }: { text?: string | null | undefined }) => {
  console.log('e');
  return (
    <div className="aspect-square p-5 absolute bottom-0 right-0 bg-[#323232] translate-y-[100%] color-white text-sm z-10 rounded-2xl max-w-[90vw">
      {text}
    </div>
  );
};

export default ToolTip;
