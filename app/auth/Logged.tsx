"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  image: string | undefined | null;
}

const Logged = ({ image }: Props) => {
  return (
    <li className="flex gap-8 items-center">
      <button
        className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md"
        onClick={() => signOut()}
      >
        Sair
      </button>
      <Link href={"/dashboard"}>
        <Image
          className="rounded-3xl"
          width={64}
          height={64}
          src={image ? image : ""}
          alt={"Foto de perfil"}
          priority
        />
      </Link>
    </li>
  );
};

export default Logged;
