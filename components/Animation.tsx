import { preloadImages } from "./utils";
import { gsap } from "gsap";
// import { map, lerp, getMousePos, calcWinsize, getRandomNumber } from "./utils";
import { useEffect, useRef } from "react";

// // Calculate the viewport size
// let winsize = calcWinsize();
// window.addEventListener("resize", () => (winsize = calcWinsize()));

// // Track the mouse position
// let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };
// window.addEventListener("mousemove", (ev) => (mousepos = getMousePos(ev)));

// class GridItem {
//   DOM: { el: any };
//   constructor(el) {
//     this.DOM = { el: el };
//     this.move();
//   }
//   // Move the items when moving the cursor
//   move() {
//     // amounts to move in each axis
//     let translationVals = { tx: 0, ty: 0 };
//     // get random start and end movement boundaries
//     const xstart = getRandomNumber(15, 60);
//     const ystart = getRandomNumber(15, 60);

//     // infinite loop
//     const render = () => {
//       // Calculate the amount to move.
//       // Using linear interpolation to smooth things out.
//       // Translation values will be in the range of [-start, start] for a cursor movement from 0 to the window's width/height
//       translationVals.tx = lerp(
//         translationVals.tx,
//         map(mousepos.x, 0, winsize.width, -xstart, xstart),
//         0.07
//       );
//       translationVals.ty = lerp(
//         translationVals.ty,
//         map(mousepos.y, 0, winsize.height, -ystart, ystart),
//         0.07
//       );

//       gsap.set(this.DOM.el, { x: translationVals.tx, y: translationVals.ty });
//       requestAnimationFrame(render);
//     };
//     requestAnimationFrame(render);
//   }
// }

// // Track the mouse position
// let mouse = { x: 0, y: 0 };
// window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

// class Cursor {
//   DOM: { el: any };
//   bounds: any;
//   renderedStyles: any;
//   onMouseMoveEv: any;

//   constructor(el) {
//     this.DOM = { el: el };
//     this.DOM.el.style.opacity = 0;

//     this.bounds = this.DOM.el.getBoundingClientRect();

//     this.renderedStyles = {
//       tx: { previous: 0, current: 0, amt: 0.2 },
//       ty: { previous: 0, current: 0, amt: 0.2 },
//     };

//     this.onMouseMoveEv = () => {
//       this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
//         mouse.x - this.bounds.width / 2;
//       this.renderedStyles.ty.previous = this.renderedStyles.ty.previous =
//         mouse.y - this.bounds.height / 2;
//       gsap.to(this.DOM.el, {
//         duration: 0.9,
//         ease: "Power3.easeOut",
//         opacity: 1,
//       });
//       requestAnimationFrame(() => this.render());
//       window.removeEventListener("mousemove", this.onMouseMoveEv);
//     };
//     window.addEventListener("mousemove", this.onMouseMoveEv);
//   }
//   render() {
//     this.renderedStyles["tx"].current = mouse.x - this.bounds.width / 2;
//     this.renderedStyles["ty"].current = mouse.y - this.bounds.height / 2;

//     for (const key in this.renderedStyles) {
//       this.renderedStyles[key].previous = lerp(
//         this.renderedStyles[key].previous,
//         this.renderedStyles[key].current,
//         this.renderedStyles[key].amt
//       );
//     }

//     this.DOM.el.style.transform = `translateX(${this.renderedStyles["tx"].previous}px) translateY(${this.renderedStyles["ty"].previous}px)`;

//     requestAnimationFrame(() => this.render());
//   }
// }

// Preload  images
// preloadImages(".grid__item-img, .bigimg").then(() => {
//   // Remove loader (loading class)
//   document.body.classList.remove("loading");
// });

// const cursor = new Cursor(document.querySelector(".cursor"));

export const Animation = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const ref6 = useRef<HTMLDivElement>(null);
  const ref7 = useRef<HTMLDivElement>(null);
  const ref8 = useRef<HTMLDivElement>(null);
  const ref9 = useRef<HTMLDivElement>(null);
  const ref10 = useRef<HTMLDivElement>(null);

  const refItems = [
    ref1,
    ref2,
    ref3,
    ref4,
    ref5,
    ref6,
    ref7,
    ref8,
    ref9,
    ref10,
  ];

  useEffect(() => {
    gsap
      .timeline()
      .set(refItems, { scale: 0.7, opacity: 0 }, 0)
      .to(
        refItems,
        {
          duration: 2,
          ease: "Expo.easeOut",
          scale: 1,
          stagger: { amount: 0.6, grid: "auto", from: "center" },
        },
        0
      )
      .to(
        refItems,
        {
          duration: 3,
          ease: "Power1.easeOut",
          opacity: 0.4,
          stagger: { amount: 0.6, grid: "auto", from: "center" },
        },
        0
      );
  });

  return (
    <body className="demo-1 loading">
      <main>
        <div className="message">
          Please view this demo on a desktop to see the effect.
        </div>
        <div className="frame">
          <div className="frame__title-wrap">
            <h1 className="frame__title">Image Grid Motion Interaction</h1>
          </div>
          <div className="frame__links">
            <a href="https://tympanus.net/Tutorials/codrops-kinetic-typo/">
              Previous demo
            </a>
            <a href="https://tympanus.net/codrops/?p=50073">Article</a>
            <a href="https://github.com/codrops/ImageGridMotionEffect">
              GitHub
            </a>
          </div>
          <div className="frame__demos">
            <a href="index.html" className="frame__demo frame__demo--current">
              01
            </a>
            <a href="index2.html" className="frame__demo">
              02
            </a>
            <a href="index3.html" className="frame__demo">
              03
            </a>
          </div>
        </div>
        <div className="content">
          <div className="grid">
            <div ref={ref1} className="grid__item pos-1">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/1.jpg" }}
              ></div>
            </div>
            <div ref={ref2} className="grid__item pos-2">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/2.jpg" }}
              ></div>
            </div>
            <div ref={ref3} className="grid__item pos-3">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/3.jpg" }}
              ></div>
            </div>
            <div ref={ref4} className="grid__item pos-4">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/4.jpg" }}
              ></div>
            </div>
            <div ref={ref5} className="grid__item pos-5">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/5.jpg" }}
              ></div>
            </div>
            <div ref={ref6} className="grid__item pos-6">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/6.jpg" }}
              ></div>
            </div>
            <div ref={ref7} className="grid__item pos-7">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/7.jpg" }}
              ></div>
            </div>
            <div ref={ref8} className="grid__item pos-8">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/8.jpg" }}
              ></div>
            </div>
            <div ref={ref9} className="grid__item pos-9">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/9.jpg" }}
              ></div>
            </div>
            <div ref={ref10} className="grid__item pos-10">
              <div
                className="grid__item-img"
                style={{ backgroundImage: "/assets/img/10.jpg" }}
              ></div>
            </div>
          </div>
          <h2 className="content__title no-select">
            <span>Grip</span>
            <span className="content__title-sub">tapes</span>
          </h2>
        </div>
      </main>
    </body>
  );
};
