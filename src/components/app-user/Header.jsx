import { useEffect, useState } from "react";
import useUserStore from "@/stores/userStore";

const Header = () => {
  const time = new Date().getHours();
  const [timeOfDay, setTimeOfDay] = useState("");
  const currency = useUserStore((state) => state.currency);

  useEffect(() => {
    if (time <= 12) {
      setTimeOfDay("morning");
    } else if (time <= 20) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("evening");
    }
  }, []);
  return (
    <div className="flex flex-col items-center m-auto">
      <section className="h-full m-auto text-justify p-4 pt-20">
        {timeOfDay === "morning" && (
          <h1 className="text-8xl font-bold">Good morning</h1>
        )}
        {timeOfDay === "afternoon" && (
          <h1 className="text-8xl font-bold">Good afternoon</h1>
        )}
        {timeOfDay === "evening" && (
          <h1 className="text-8xl font-bold">Good evening</h1>
        )}
      </section>
      <section>
        <h1 className="text-4xl font-bold">Currency: {currency}$</h1>
      </section>
    </div>
  );
};

export default Header;
