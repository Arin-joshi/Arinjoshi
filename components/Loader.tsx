const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b12] overflow-hidden">
      
      {/* background glow */}
      <div className="absolute w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[160px] -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px] bottom-[-200px] right-[-200px]"></div>

      {/* grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* main card */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-10 py-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
        
        {/* animated rings */}
        <div className="relative w-20 h-20">
          <span className="absolute inset-0 rounded-full border-2 border-violet-500/40 animate-ping"></span>
          <span className="absolute inset-0 rounded-full border-2 border-violet-400 animate-spin"></span>
        </div>

        {/* text */}
        <div className="text-center">
          <h1 className="text-lg font-semibold tracking-wide text-white">
            Loading Portfolio
          </h1>
          <p className="text-sm text-white/60 tracking-widest mt-1">
            Building experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
