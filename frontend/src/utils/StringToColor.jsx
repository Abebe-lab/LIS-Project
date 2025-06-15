// Function to generate a color based on a string input
const StringToColor = (str) => {
  const defaultColor="grey";
  try{
    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
      hash = str?.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value?.toString(16))?.substr(-2);
    }
    return color;
  }catch(error){
    console.log(error);
    return defaultColor;
  }
  };
  export default StringToColor;