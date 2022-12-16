import { useState, useRef, useEffect } from "react";

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing')

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  function Canvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      ctx.font = "48px serif";
      ctx.strokeText("Hello world", 10, 50);
      ctx.fillRect(0, 0, 100, 100);
    });

    return (
      <canvas ref={canvasRef}></canvas>
    );
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea value={answer} onChange={handleTextareaChange} disabled={status === 'submitting'} />
        <br />
        <button disabled={answer.length === 0 || status === 'submitting'}>submit</button>
      </form>
      {error !== null && <p style={{ "color": "red" }}>{error.message}</p>}
      <Canvas height={100} width={100} />
    </>
  );
}

function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shoudError = answer.toLowerCase() !== 'lima';
      if (shoudError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}