import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [date, setDate] = useState("");
  const [typedText, setTypedText] = useState("");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const name = "Collins"; // change to "Immortal" anytime

  // TYPEWRITER
  useEffect(() => {
    if (step === 0) {
      const text = `Hey you 😊... it's ${name}`;
      let i = 0;

      const interval = setInterval(() => {
        setTypedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 70);

      return () => clearInterval(interval);
    }
  }, [step]);

  // SEND RESPONSE (OPTIONAL HOOK)
  const sendResponse = async (data) => {
    try {
      // Replace this with your backend / Google Sheets API later
      await fetch("https://your-api-endpoint.com/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log("Response not sent (no backend connected)");
    }
  };

  const handleAnswer = (value) => {
    setAnswer(value);

    if (value === "yes") {
      confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 } });
      setStep(2);
    } else {
      setStep(3);
    }

    sendResponse({ answer: value, name });
  };

  const moveNoButton = () => {
    const x = Math.random() * 120 - 60;
    const y = Math.random() * 120 - 60;
    setNoPos({ x, y });
  };

  const confirmDate = () => {
    setStep(5);
    sendResponse({ answer: "yes", date, name });
  };

  return (
    <div style={styles.container}>
      <div className="hearts">💗 💖 💕 💞 💗 💖</div>

      {/* STEP 0 - GREETING */}
      {step === 0 && (
        <div style={styles.card}>
          <h2>{typedText}</h2>
          <p>I’ve been thinking about you…</p>

          <button style={styles.button} onClick={() => setStep(1)}>
            Continue
          </button>
        </div>
      )}

      {/* STEP 1 - QUESTION */}
      {step === 1 && (
        <div style={styles.card}>
          <h2>Will you go on a date with me? ❤️</h2>

          <select
            onChange={(e) => handleAnswer(e.target.value)}
            defaultValue=""
            style={styles.select}
          >
            <option value="" disabled>
              Choose...
            </option>
            <option value="yes">Yes 😊</option>
            <option value="no">No 😅</option>
          </select>

          {/* FUN NO BUTTON (optional alternative UX) */}
          <button
            onMouseEnter={moveNoButton}
            style={{
              ...styles.noButton,
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            }}
          >
            No 😅
          </button>
        </div>
      )}

      {/* STEP 2 - YES */}
      {step === 2 && (
        <div style={styles.card}>
          <h2>Wow… did you just say yes? 🥹❤️</h2>
          <p>You just made <b>{name}</b> really happy.</p>

          <button style={styles.button} onClick={() => setStep(4)}>
            Continue
          </button>
        </div>
      )}

      {/* STEP 3 - NO */}
      {step === 3 && (
        <div style={styles.card}>
          <h2>Okay, I understand 🙂</h2>
          <p>Thanks for being honest with me.</p>
        </div>
      )}

      {/* STEP 4 - DATE */}
      {step === 4 && (
        <div style={styles.card}>
          <h2>When are you free? 📅</h2>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />

          <button
            style={styles.button}
            disabled={!date}
            onClick={confirmDate}
          >
            Confirm
          </button>
        </div>
      )}

      {/* STEP 5 - FINAL */}
      {step === 5 && (
        <div style={styles.card}>
          <h2>Perfect… I’ll see you soon ❤️😊</h2>
          <p>— {name}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffe6f0, #ffffff)",
    fontFamily: "Arial",
    overflow: "hidden",
    position: "relative",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "320px",
    zIndex: 2,
  },

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#ff4d6d",
    color: "white",
    cursor: "pointer",
  },

  noButton: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid #aaa",
    background: "#fff",
    cursor: "pointer",
    position: "relative",
    transition: "0.2s",
  },

  select: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "10px",
    width: "100%",
  },

  input: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "10px",
    width: "100%",
  },
};