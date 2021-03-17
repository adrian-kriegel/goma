# What is Goma?

Goma is an experimental word processor based on web technologies like [React](https://reactjs.org/), [webpack](https://webpack.js.org/), and [Babel](https://babeljs.io/). 



## Motivation

The goal was to create an alternative to [LaTeX](https://en.wikipedia.org/wiki/LaTeX) using modern web technologies. 

## The problem(s) with LaTeX

[LaTeX](https://en.wikipedia.org/wiki/LaTeX) is great for writing scientific documents as it's really good at typesetting equations. In my opinion, it doesn't really do a great job at anything  else. Of course, this is all opinion based.

### Syntax

LaTeX syntax is weird. Which is no surprise, considering it's almost 40 years old. It sure makes sense to some people, but I think most beginners will simply refuse to actually learn it as it also seems quite inconsistent. I have been writing LaTeX documents for years now and I still have no idea of what exactly I'm doing when using some macros. 

### Customization

Again, projecting from experience again but my LaTeX workflow always looks like this:

1. Copy the template from my University
2. Add some content below the 300 lines of template code.
3. I into a problem trying to do something trivial.
4. [search engine] redirects me to [stackexchange site]. 
5. I copy-paste a bunch of ```\usepackage``` commands until it's working
6. Template now has 310 lines.

Try to do something no one has dared to ask before with some wise old TeX-Guru sharing their ancient wisdom? You're screwed. 

At that point to would also have to admit to all Microsoft-Word users that LaTeX isn't so perfect after all, which probably hurts the most. 

## Solution

Luckily, browsers were designed specifically rendering stylized documents. The documentation is really good and there are thousands of guides when it comes to CSS or Javascript. CSS and Javascript syntax is simple and consistent. Using [React](https://reactjs.org/), you can create your own Components and you can change the style using CSS or even [SASS](https://sass-lang.com/) if you like. Here are some ideas of what you could do using Goma: 

- Keep using LaTeX for equations (implemented)
- Render elements using either the browser
- Render elements using [Node.js](https://nodejs.org)
- Make charts using [Chart.js](https://www.chartjs.org/) instead of using images
- Make charts that render from Matlab or Python 
- Use existing components and packages from [npm](https://www.npmjs)
- Include live data from APIs
- Render code samples from the actual source code


## File/Folder structure

As this is still all experimental, all source code is within this package.

- **src/loaders/** contains the webpack loader used to transform .gm documents into React components (the actual core, will be moved to a stand-alone package at some point)
- **src/components/** contains some React components that are useful in Documents
- **public/** contains the html template the document is rendered in
- **document/** contains your document files and setup
- **document/root.jsx** contains your entry point
- **document/document.gm** goma file for your document
- **document/chapters/** contains other Goma files that are imported into your document 
- **document/autoinclude.ts** tells the Goma loader what to import into all .gm files after they are turned into react components
- **document/paged.scss** stylesheet for [Paged.js](https://www.pagedjs.org/) used for paginating your document

The rest if the files are the basic Babel/webpack/TypeScript setup. 

## Examples

This repository also serves as an example goma project as all of this is still experimental. The basic structure of a .gm file is as follows:

```
    *Javascript imports*

    <goma begin/>

    *XML-like document (JSX)*
```
Examples from this repository:

```javascript
// file: document.gm
import ChapterOne from './chapters/chapter-one';
import ChapterTwo from './chapters/chapter-two';

<goma begin />

<Chapter
  title='Chapter One'
>
  <ChapterOne />
</Chapter>
<Chapter
  title='Chapter Two'
>
  <ChapterTwo />
</Chapter>

```

```xml
// file: chapter-one.gm
<goma begin />

Some text below the title. Allows equations such as <E> E = mc^2 </E>. 
Also block equations:

<Equation>
\begin{split}
  &J(u;r,t_0,T) = \int_{t_0}^{T} g(x(t;x_0, u), t) dt  + h(x(T;x_0, u), T) \\
  &g,h : \mathbb{R}^n\times\mathbb{R} \rightarrow \mathbb{R}
\end{split}
</Equation>

Cool, right?


```


## Inner Workings

### Goma Loader

The Goma loader is a webpack loader assiociated with the .gm file extension. It turns .gm files into React components by simple string manipulation. 

### LaTeX

As you can see in the examples, you can use LaTeX-equations using the ```<E>``` (for inline-equations) and the ```<Equation>``` (for block-equations). These tags are replaced with SVGs by the Goma loader using [mathjax-node](https://www.npmjs.com/package/mathjax-node). This means that the equations are not rendered in the browser (which is probably faster). Using literal LaTeX code in Javascript can be tricky due to the backslashes and other special characters that need to be replaced.

