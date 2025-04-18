const AuthImagePattern = () => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-tertiary p-12 pt-28">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`size-32 rounded-2xl bg-primary/40 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
