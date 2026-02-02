const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-4 border-[var(--neon-green)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
