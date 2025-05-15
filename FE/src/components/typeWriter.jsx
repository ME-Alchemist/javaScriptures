const TypeWriterComp = ({ text, speed = 20, element }) => {
  try {
    let i = 0;
    let txt = text;
    const para = document.createElement("p");
    element.appendChild(para);

    const typeWriter = () => {
      if (i < txt.length) {
        para.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };
    typeWriter();
  } catch (error) {
    console.log(error);
  }
};

export default TypeWriterComp;
