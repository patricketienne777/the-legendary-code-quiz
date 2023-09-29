const questionheader = document.getElementsByClassName("soruh1")[0];
const infoheader = document.getElementsByClassName("info")[0];
const questioninput = document.getElementsByClassName("answerinput")[0];

const success = async () => {
  try {
    const response = await fetch("/questionsjson");

    const result = await response.json();

    questionheader.innerHTML = result.soru;
    infoheader.innerHTML = "";
    questioninput.value = "";
  } catch (error) {
    console.error("Error:", error);
  }
};

const getdata = async () => {
  const data = questionheader.innerHTML;
  const data2 = questioninput.value;

  try {
    const response = await fetch("/postanswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: data, answer: data2 }),
    });

    const result = await response.json();

    if (result === "Success") {
      infoheader.innerHTML = "True !!";
      infoheader.style.color = "green";
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await success();
    } else {
      infoheader.innerHTML = "Wrong Answer !!";
      infoheader.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
