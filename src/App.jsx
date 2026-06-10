import { useState } from "react";
import confetti from "canvas-confetti";
import { supabase } from "./supabase";
import "./index.css";

function App() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [activities, setActivities] = useState([]);

  const toggleActivity = (activity) => {
    if (activities.includes(activity)) {
      setActivities(
        activities.filter((a) => a !== activity)
      );
    } else {
      setActivities([...activities, activity]);
    }
  };

  const saveNo = async () => {
    await supabase.from("date_responses").insert([
      {
        answer: "No",
      },
    ]);

    setStep(99);
  };

  const saveYes = () => {
    confetti({
      particleCount: 150,
      spread: 90,
    });

    setStep(2);
  };

  const submitDate = async () => {
    await supabase.from("date_responses").insert([
      {
        answer: "Yes",
        selected_date: date,
        activities,
      },
    ]);

    setStep(5);
  };

  return (
    <div className="container">

      <div className="hearts">
        ❤️ 💖 💕 💗 💞
      </div>

      {step === 0 && (
        <div className="card">
          <h1>Hey Beautiful 😊</h1>

          <p>
            Before you continue...
          </p>

          <p>
            I just want you to know
            this took a little courage
            from Collins ❤️
          </p>

          <button
            onClick={() => setStep(1)}
          >
            Continue
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="card">
          <h2>
            There's only one question...
          </h2>

          <h3>
            Will you let Collins take you out
            sometime? ❤️
          </h3>

          <div className="actions">
            <button
              className="yesBtn"
              onClick={saveYes}
            >
              YES 💖
            </button>

            <button
              className="noBtn"
              onClick={saveNo}
            >
              NO 🙈
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h1>WAIT... 😍</h1>

          <h2>
            DID YOU JUST SAY YES?!
          </h2>

          <p>
            You just made Collins smile ❤️
          </p>

          <button
            onClick={() => setStep(3)}
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2>When are you free? 📅</h2>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

          <button
            disabled={!date}
            onClick={() => setStep(4)}
          >
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="card">
          <h2>
            What should our date include?
          </h2>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                toggleActivity("Coffee")
              }
            />
            ☕ Coffee
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                toggleActivity("Food")
              }
            />
            🍕 Food
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                toggleActivity("Movie")
              }
            />
            🎬 Movie
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                toggleActivity("Walk")
              }
            />
            🚶 Walk
          </label>

          <button onClick={submitDate}>
            Confirm ❤️
          </button>
        </div>
      )}

      {step === 5 && (
        <div className="card">
          <h1>Perfect ❤️</h1>

          <p>
            Date Accepted ✔️
          </p>

          <p>
            Collins has received your answer.
          </p>

          <h2>
            See you soon 😊
          </h2>
        </div>
      )}

      {step === 99 && (
        <div className="card">
          <h2>
            Okay, I understand 🙂
          </h2>

          <p>
            Thank you for being honest.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;