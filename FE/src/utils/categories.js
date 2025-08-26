const categories = [
  {
    id: "html",
    title: "Runes of Structure (HTML)",
    preparation:
      "In the ancient scrolls of the Weblands, the Runes of Structure — known to sages as HTML — form the bones of all that is seen. You will be tested on sacred elements such as <div>, <a>, and <img>, and the wisdom of attributes like 'href' and 'alt'. Study the glyphs well, for structure is the foundation upon which all kingdoms are built.",
    reference: "https://www.w3schools.com/html/",
    img: "/images/decorations/htmlDeco2.webp",
    code_block: `
    <div>
      <h1>Hello, traveler!</h1>
      <p>This is a paragraph.</p>

      <section>
        <p>This is a nested paragraph.</p>

        <article>
        <p>below is an unordered list inside an article</p>

          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </article>
      </section>
    </div>`,
  },
  {
    id: "css",
    title: "Cloaks of Style (CSS)",
    preparation:
      "Among the Elven stylists and Dwarven decorators, the Cloaks of Style — or CSS — grant form and beauty to the raw skeleton of code. You shall be asked about the secrets of colors, spacing, layout spells like flex and grid, and the mystical hierarchy of selectors. Dress your knowledge in elegance, and you shall pass unscathed.",
    reference: "https://www.w3schools.com/css/",
    img: "/images/decorations/cssDeco2.webp",
    code_block: `
    /*This is a comment*/
    /* select all <p> elements */

     p {
        color: crimson;
        align-items: center;
        text-shadow: 2px 4px 3px black;
    }
    
    /* select all elements with class="className" */

    .className {
        background-color: white;
        display: flex;
        justify-content: center;
    }
`,
  },
  {
    id: "javascript",
    title: "Scrolls of Behavior (JavaScript)",
    preparation:
      "Only the wise dare open the Scrolls of Behavior. These living scripts — JavaScript — breathe life into the static. Expect to duel with variables, functions, conditions, and loops. The brave may also glimpse the Shadows of Scope and the Storm of Events. Wield logic as your sword, and let no bug stand in your path.",
    reference: "https://www.w3schools.com/js/",
    img: "/images/decorations/jsDeco.webp",
    code_block: `
  // A JavaScript function that displays "Hello World" on an element with the id="demo"

    function myFunction() {
      document.getElementById("demo").innerHTML = "Hello World";
    }

    // A query Selector that finds an element
    // with the class "aButton" and adds a click event listener
    
    document.querySelector(".aButton").onclick = () => {
      alert("Quest accepted!");
    };
`,
  },
];

export default categories;
