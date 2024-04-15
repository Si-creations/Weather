export const rightIncomingx = {
    hidden: { x: 1200, opacity: 1 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      x: -400,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  export const fade = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { ease: "easeOut", duration: 0.75 },
    },
    exit: {
      opacity: 0,
      transition: { ease: "easeOut", duration: 0.75 },
    },
  };
  