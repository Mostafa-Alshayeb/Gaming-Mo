import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={
        className ||
        "text-lg md:text-2xl  my-4.5 font-semibold border-r--cyan-50"
      }
    >
      <h1 className="text-cyan-300 inline">GAMES </h1>
      <span className="text-white">MO</span>
    </Link>
  );
};

export default Logo;
