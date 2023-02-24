import Link from "next/link";
import Login from "./Login";

const Nav = async () => {
  return (
    <nav className="flex justify-between items-center py-8">
      {/* Server side */}
      <Link href={"/"}>
        <h1 className="font-bold text-lg">Teste</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {/* Client side */}
        <Login />
      </ul>
    </nav>
  );
};

export default Nav;
