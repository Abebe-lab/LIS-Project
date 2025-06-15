//date, currency, string
function CapitalizeWords(sentence) {
    return sentence
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  const StripUnderscoreAndCapitalizeLeters=(label)=>{
    return label
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  }
  function NumberWithCommas(x) {
    // Convert the number to a string
    let parts = x.toString().split(".");
    
    // Split the integer part into an array of individual digits
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Join the integer part and the fractional part if it exists
    return parts.join(".");
}

  export {CapitalizeWords, StripUnderscoreAndCapitalizeLeters, NumberWithCommas}