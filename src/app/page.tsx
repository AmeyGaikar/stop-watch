import Counter from "@/components/counter";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="text-center text-5xl mt-3">Stop watch</div>
      <Counter />
    </>
  );
}
