import limax from "limax";
export const utilTone = (char) => {
  const text = limax(char, { tone: true })
  if(text) {
    const tone = text.split("").pop();
    return Number(tone);
  }
  return 0
};

