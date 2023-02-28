import Link from "next/link";
import Login from "./Login";
import Logged from "./Logged";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  console.log("Dados user ------->");
  console.log(session)

  return (
    <nav className="flex justify-between items-center py-8">
      {/* Server side */}
      <Link href={"/"}>
        <h1 className="font-bold text-lg">Teste</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {/* Client side */}
        {session?.user ? <Logged image={session.user?.image || ""} /> : <Login />}
      </ul>
    </nav>
  );
};

export default Nav;
