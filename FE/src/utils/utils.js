  
  // Type writer effect
  export const appendToQuestLog = async (text, fSize, fStyle, fColor) => {
    try {
      let i = 0;
      let txt = text;
      let speed = 20;
      const para = document.createElement("p");
      para.style.fontSize = fSize;
      para.style.fontStyle = fStyle;
      para.style.color = fColor;
      const questLog = document.querySelector(".questProgress");
      questLog.appendChild(para);

      const typeWriter = () => {
        if (i < txt.length) {
          para.innerHTML += txt.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        }
        para.scrollIntoView({ behavior: "smooth" });
      };
      typeWriter();
    } catch (error) {
      console.log(error);
    }
  };