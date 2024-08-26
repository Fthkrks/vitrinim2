import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center gap-x-10">
      Hello world !
      <UserButton/>
    </div>
  );
}
