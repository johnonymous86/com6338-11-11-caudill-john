const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`


const makeH2 = makeTag('h2');

const makeH3 = makeTag('h3');

const makeEm = makeTag('em');

const makeP = makeTag('p');

const makeBr = () => '<br>';


const makePoemHTML = (poemData) => {
  
  poemEl.innerHTML = '';

  const poem = poemData[0]; 

  const title = poem.title;
  const author = poem.author;
  const lines = poem.lines;

  
  const titleHTML = makeH2(title);

  
  const authorHTML = pipe(
    str => `by ${str}`, 
    makeEm,             
    makeH3              
  )(author);

  
  let stanzasHTML = '';
  let currentStanzaLines = [];

  lines.forEach((line, index) => {
    if (line === "") {
      
      if (currentStanzaLines.length > 0) {
        
        const stanzaContent = currentStanzaLines.map((l, i) =>
          i === currentStanzaLines.length - 1 ? l : l + makeBr()
        ).join('');
        stanzasHTML += makeP(stanzaContent);
        currentStanzaLines = []; 
      }
    } else {
      currentStanzaLines.push(line);
    }
  })}
