const ToolTip = ({ text }: { text?: string | null | undefined }) => {
  return (
    <div className="w-[400px] min-w-[30vw] max-w-[80vw] p-5 absolute bottom-0 right-[50%] translate-x-[50%] bg-[#323232] translate-y-[100%] color-white text-sm z-10 rounded-2xl max-w-[90vw">
      {text}
    </div>
  );
};

export default ToolTip;
