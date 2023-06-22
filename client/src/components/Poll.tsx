import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FC, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Button from "./Button";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PollProps {
  id: number;
  title: string;
  variants: Record<string, number>;
}


export default function Poll({ id, title, variants }: PollProps) {
  const [labels, setLabels] = useState<string[]>(Object.keys(variants));
  const [data, setData] = useState<number[]>(Object.values(variants));
  const [vote, setVote] = useState<number>(localStorage.getItem(`poll-${id}`) ? parseInt(localStorage.getItem(`poll-${id}`)!) : -1);
  const [selected, setSelected] = useState<number>(-1);

  // I want it to change with seed random but, Robert Lis, not today. I fell sick today and i don't have time to do it. I'm sorry.
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#00FF00", "#0000FF", "#FF0000", "#00FFFF", "#FF00FF", "#FFFF00", "#000000", "#FFFFFF", "#C0C0C0", "#808080", "#800000", "#808000", "#008000", "#800080", "#008080", "#000080"]

  useEffect(() => {
    setLabels(Object.keys(variants));
    setData(Object.values(variants));
  }, [variants])

  const addVote = async (variant: number, chart: ChartJS) => {
    console.log("variant", labels[variant])
    console.log("vote label", labels[vote])
    console.log("vote", vote)

    if (vote !== -1) {
      await axios.get(`/api/polls/unvote?id=${id}&index=${vote}`)
    }

    const newData: Poll = (await axios.get(`/api/polls/vote?id=${id}&index=${variant}`)).data.poll

    console.log(newData);

    setData(Object.values(newData.options));
    setVote(variant);
    localStorage.setItem(`poll-${id}`, variant.toString());

    setSelected(-1);
    chart.update();
  }

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <h2 className="text-xl font-bold text-center">{title}</h2>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="flex flex-row justify-center items-center flex-wrap w-3/4">
          {labels.map((label, index) => (
            <div onClick={() => setSelected(index)} key={index} className="flex flex-row justify-center items-center m-2">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[index] }}></div>
              <p className="text-base font-medium hover:underline underline-offset-2 cursor-pointer">{`${label} [${data[index]}]`}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center mt-4 w-1/2">
          <Doughnut className="w-10 h-10"
            id={id.toString()}
            data={{
              labels: labels,
              datasets: [{
                data: data,
                backgroundColor: colors
              }],
            }}
            options={{
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
        <Button text={
            (labels[selected] ? `Głosować za ${labels[selected]}` : undefined) || (labels[vote] ? `Głosowałeś za ${labels[vote]}` : "Wybierz opcje z legendy aby zagłosować")
          } 
          onClick={() => {
            console.log(selected);
            if (selected > -1) {
              addVote(selected, ChartJS.getChart(id.toString())!);
            }
          }}
          isActive={selected > -1}
          className="mt-4"
        />
        {/* <Button className="mt-4" text="Resetuj" onClick={() => { localStorage.clear() }} /> */}
      </div>
    </div>
  )
}

interface Poll {
  id: number,
  title: string,
  options: Record<string, number>
}
