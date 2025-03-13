import "@/styles/numberInput.css";
import { useEffect, useState } from "react";

const ShowPorcentages = ({ needs, wants, savings, totalMoney }) => {
  return (
    <div className="text-4xl font-semibold">
      <h1>Needs: {Math.round((needs / totalMoney) * 100)}%</h1>
      <h1>Wants: {Math.round((wants / totalMoney) * 100)}%</h1>
      <h1>Savings: {Math.round((savings / totalMoney) * 100)}%</h1>
    </div>
  );
};

const Savings = () => {
  const [needs, setNeeds] = useState(0);
  const [wants, setWants] = useState(0);
  const [savings, setSavings] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [infoComplete, setInfoComplete] = useState(false);

  useEffect(() => {
    if (needs != 0 && wants != 0 && savings != 0) {
      console.log("is complete");
      setInfoComplete(true);
    }
  }, [totalMoney]);

  const handleChangeNeeds = (e) => {
    setNeeds(Number(e.target.value));
  };

  const handleChangeWants = (e) => {
    setWants(Number(e.target.value));
  };

  const handleChangeSavings = (e) => {
    setSavings(Number(e.target.value));
  };

  useEffect(() => {
    const tempTotal = needs + wants + savings;
    console.log(tempTotal);
    setTotalMoney(tempTotal);
  }, [needs, wants, savings]);

  return (
    <div className="flex flex-row">
      <section className="flex flex-1/2 flex-col items-center">
        <h2 className="mx-auto my-8 px-6 py-4 text-4xl font-bold border-2 rounded-4xl border-zinc-500 hover:border-emerald-500 duration-1000">
          50/30/20
        </h2>
        {infoComplete ? (
          <ShowPorcentages
            needs={needs}
            wants={wants}
            savings={savings}
            totalMoney={totalMoney}
          />
        ) : (
          <h1 className="text-4xl font-semibold">Add all the info</h1>
        )}
      </section>
      <section className="flex flex-1/2 flex-col">
        <h2 className="mx-auto my-8 px-6 p-4 text-4xl font-bold border-2 rounded-4xl border-zinc-500 hover:border-emerald-500 duration-1000">
          {" "}
          Add Info
        </h2>
        <div className="flex flex-col m-auto" autoComplete="off">
          <section className="flex flex-row">
            <section className="flex flex-col text-xl gap-3 flex-1">
              <span>Needs: </span>
              <span>Wants: </span>
              <span>Savings:</span>
            </section>
            <section>
              <span className="text-xl flex pr-10 py-2">
                <input
                  onChange={handleChangeNeeds}
                  className="number-input border-2 rounded-xl border-zinc-500 ml-4 px-2 appearance-none"
                  type="number"
                  size={20}
                  name="needs"
                />
              </span>
              <span className="text-xl mx-0 pr-10 py-2">
                <input
                  onChange={handleChangeWants}
                  className="number-input border-2 rounded-xl border-zinc-500 px-2 ml-4"
                  type="number"
                  size={20}
                  name="wants"
                  maxLength={20}
                />
              </span>
              <span className="text-xl mx-0 flex pr-10 py-2">
                <input
                  onChange={handleChangeSavings}
                  className="number-input border-2 rounded-xl border-zinc-500 px-2 ml-4"
                  type="number"
                  size={20}
                  name="savings"
                  maxLength={20}
                />
              </span>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Savings;
